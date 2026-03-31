import { $ZodErrorTree } from "zod/v4/core";

/**
 * Flattens a Zod v4 error tree into a simple object keyed by field name.
 *
 * The returned map contains only the first error message for each field.
 * Nested object paths are not preserved; only the immediate property key is used.
 *
 * @example
 * const parsedData = OnboardingSchema.safeParse(data);
 *
 * if (!parsedData.success) {
 *   const errors = flattenZodErrors(
 *     // ts-expect-error - this is the correct type, but zod's types are very broken
 *     z.treeifyError(parsedData.error).properties ?? {},
 *   );
 *
 *   return { errors, success: false };
 * }
 *
 * @typeParam T - The schema input/output type represented by the Zod error tree.
 * @param zodError - Error tree produced from a failed Zod parse.
 * @returns A record of `{ fieldName: firstErrorMessage }` entries.
 */

export function flattenZodErrors<T>(
  zodError: $ZodErrorTree<T>,
): Record<string, string> {
  const flattened: Record<string, string> = {};

  for (const entity of Object.values(zodError)) {
    // @ts-expect-error - this is the correct type, but zod's types are very broken
    for (const [field, { errors }] of Object.entries(entity.properties ?? {})) {
      if (errors.length > 0) {
        flattened[field] = errors[0];
      }
    }
  }

  return flattened;
}
