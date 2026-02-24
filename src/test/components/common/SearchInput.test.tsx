import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import SearchInput from "src/components/common/SearchInput";

const searchByTitleMock = vi.fn();

vi.mock("src/hooks/useDatabase", () => ({
  default: () => ({
    searchByTitle: searchByTitleMock,
  }),
}));

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("normalizes query to lowercase and calls search", () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText(
      "Caută o rețetă",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Supa" } });

    fireEvent.click(screen.getByLabelText("search"));

    expect(searchByTitleMock).toHaveBeenCalledWith("supa");
  });

  it("clears input and runs empty search", () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText(
      "Caută o rețetă",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "anything" } });

    fireEvent.click(screen.getByLabelText("clear search input"));

    expect(input.value).toBe("");
    expect(searchByTitleMock).toHaveBeenCalledWith("");
  });
});
