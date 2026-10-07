export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dashclue.com"
).replace(/\/$/, "");
export const CONTACT_EMAIL = "dashclue.contact@gmail.com";
export const PRO_PRICE = process.env.NEXT_PUBLIC_PRO_PRICE_LABEL ?? "$7";
