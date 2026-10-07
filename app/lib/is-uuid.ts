const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Ids are interpolated into API paths, so reject anything that isn't a UUID.
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}
