export const capitalizeString = (string: string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const reorderList = <T>(list: T[], elementIndex: number) => {
  const editableList = [...list];
  const firstElement = editableList.splice(elementIndex, 1);
  editableList.splice(0, 0, ...firstElement);

  return editableList;
};

export const pickDirty = <T extends Record<string, unknown>>(
  values: T,
  dirty: Partial<Record<keyof T, boolean | Partial<Record<string, unknown>>>>,
): Partial<T> => {
  const out: Partial<T> = {};
  for (const key of Object.keys(dirty ?? {})) {
    if (!dirty[key]) continue;

    // nested objects/arrays will usually be `true` or nested dirty maps
    out[key as keyof T] = values[key as keyof T];
  }
  return out;
};
