import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_COOKIE = "auth_token";
// Matches the backend's session inactivity deadline (30 days).
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
// Clears a stale cookie and lands on /login (see app/api/auth/clear/route.ts).
export const SIGN_OUT_PATH = "/api/auth/clear";

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
  // Rodauth reports field problems as ["field", "message"].
  fieldError: [string, string] | null;
  headers: Headers;
};

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  // Send the user's JWT. Requests without a session redirect to /login.
  auth?: boolean;
  // By default a 401 means the session is gone and the user is signed out.
  // Password-confirmation endpoints also answer 401 for a wrong password, so
  // they opt out and handle it themselves.
  signOutOnUnauthorized?: boolean;
};

const FALLBACK_ERRORS: Record<number, string> = {
  403: "You don't have access to this.",
  404: "Not found.",
  429: "Too many requests. Please wait a moment and try again.",
};

function apiUrl(path: string) {
  const base = process.env.API_URL;
  if (!base) throw new Error("API_URL is not configured");
  return `${base.replace(/\/$/, "")}${path}`;
}

// The API sees every request coming from this server, so pass the real
// client IP along for per-user rate limiting.
async function clientIpHeaders(): Promise<Record<string, string>> {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) return {};

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip");
  return ip ? { "X-Client-IP": ip, "X-Internal-Secret": secret } : {};
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value;
}

export async function apiFetch<T = unknown>(
  path: string,
  {
    method = "GET",
    body,
    auth = true,
    signOutOnUnauthorized = true,
  }: ApiOptions = {},
): Promise<ApiResult<T>> {
  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(await clientIpHeaders()),
  };
  if (body !== undefined) requestHeaders["Content-Type"] = "application/json";

  if (auth) {
    const token = await getToken();
    if (!token) redirect("/login");
    requestHeaders.Authorization = token;
  }

  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      method,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch (err) {
    console.error(`API request failed: ${method} ${path}`, err);
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Can't reach the server. Please try again.",
      fieldError: null,
      headers: new Headers(),
    };
  }

  if (res.status === 401 && auth && signOutOnUnauthorized) {
    redirect(SIGN_OUT_PATH);
  }

  let json: unknown = null;
  if (res.status !== 204) {
    try {
      json = await res.json();
    } catch {
      json = null;
    }
  }

  const payload = (json ?? {}) as { error?: unknown; "field-error"?: unknown };
  const fieldError = Array.isArray(payload["field-error"])
    ? (payload["field-error"] as [string, string])
    : null;

  return {
    ok: res.ok,
    status: res.status,
    data: res.ok ? (json as T) : null,
    error: res.ok
      ? null
      : typeof payload.error === "string"
        ? payload.error
        : (FALLBACK_ERRORS[res.status] ??
          "Something went wrong. Please try again."),
    fieldError,
    headers: res.headers,
  };
}
