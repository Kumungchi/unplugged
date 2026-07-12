// Shared helpers for pages whose copy can be overridden from the
// Convex-backed /admin/content editor, falling back to the hardcoded
// defaults below when no published override exists.

export const contentKey = (prefix: string, field: string) => `${prefix}.${field}`;

export const contentKeysFor = (prefix: string, fields: string[]) =>
  fields.map((field) => contentKey(prefix, field));

export function mergeContentOverrides<T extends Record<string, unknown>>(
  base: T,
  overrides: Record<string, string> | undefined,
  prefix: string,
  arrayFields: ReadonlySet<string> = new Set(),
): T {
  if (!overrides) return base;
  const merged = { ...base };
  for (const field of Object.keys(base)) {
    const raw = overrides[contentKey(prefix, field)];
    if (raw === undefined) continue;
    (merged as Record<string, unknown>)[field] = arrayFields.has(field)
      ? raw.split('\n').map((line) => line.trim()).filter(Boolean)
      : raw;
  }
  return merged;
}
