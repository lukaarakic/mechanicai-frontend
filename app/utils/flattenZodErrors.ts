type ZodFieldError = {
  errors: string[];
};

type ZodEntityError = {
  errors: string[];
  properties: Record<string, ZodFieldError>;
};

type ZodErrorShape = Record<string, ZodEntityError>;

export function flattenZodErrors(
  zodError: ZodErrorShape,
): Record<string, string> {
  const flattened: Record<string, string> = {};

  for (const entity of Object.values(zodError)) {
    for (const [field, { errors }] of Object.entries(entity.properties ?? {})) {
      if (errors.length > 0) {
        flattened[field] = errors[0];
      }
    }
  }

  return flattened;
}
