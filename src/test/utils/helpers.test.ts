import { describe, expect, it } from "vitest";

import {
  capitalizeString,
  pickDirtyFields,
  reorderList,
} from "src/utils/helpers";

describe("helpers", () => {
  it("capitalizes first letter and lowercases the rest", () => {
    expect(capitalizeString("aNaNaS")).toBe("Ananas");
  });

  it("moves selected element to first position", () => {
    expect(reorderList(["a", "b", "c"], 2)).toEqual(["c", "a", "b"]);
  });

  it("picks only dirty fields", () => {
    const values = { title: "Soup", servings: 2, category: "Prânz" };
    const dirty = { title: true, servings: false, category: true };

    expect(pickDirtyFields(values, dirty)).toEqual({
      title: "Soup",
      category: "Prânz",
    });
  });
});
