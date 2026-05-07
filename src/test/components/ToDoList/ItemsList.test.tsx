import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ItemsList from "src/components/ToDoList/ItemsList";

afterEach(() => {
  cleanup();
});

describe("ItemsList", () => {
  it("shows only the add form after clicking the add button", async () => {
    const user = userEvent.setup();

    render(
      <ItemsList
        items={[]}
        onAddItem={vi.fn()}
        onDeleteItem={vi.fn()}
        onShareList={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("textbox", { name: /adaugă un to-do/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: /email pentru partajare/i }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /adaugă un element în listă/i }),
    );

    expect(
      screen.getByRole("textbox", { name: /adaugă un to-do/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: /email pentru partajare/i }),
    ).not.toBeInTheDocument();
  });

  it("shows only the share form after clicking the share button", async () => {
    const user = userEvent.setup();

    render(
      <ItemsList
        items={[]}
        onAddItem={vi.fn()}
        onDeleteItem={vi.fn()}
        onShareList={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /partajează lista cu altcineva/i }),
    );

    expect(
      screen.getByRole("textbox", { name: /email pentru partajare/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: /adaugă un to-do/i }),
    ).not.toBeInTheDocument();
  });

  it("shows an error message when the todo item is empty", async () => {
    const user = userEvent.setup();

    render(
      <ItemsList
        items={[]}
        onAddItem={vi.fn()}
        onDeleteItem={vi.fn()}
        onShareList={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /adaugă un element în listă/i }),
    );

    const listItemInput = screen.getByRole("textbox", {
      name: /adaugă un to-do/i,
    });
    const form = listItemInput.closest("form");

    if (!form) {
      throw new Error("List item form was not rendered.");
    }

    await user.click(within(form).getByRole("button"));

    expect(
      await screen.findByText(/completează un to-do înainte să-l adaugi/i),
    ).toBeInTheDocument();
  });

  it("hides the delete action for items shared by another user", () => {
    render(
      <ItemsList
        items={[
          {
            id: "shared-item-1",
            item: "shared task",
            ownerId: "other-user",
            isOwnedByCurrentUser: false,
          },
        ]}
        onAddItem={vi.fn()}
        onDeleteItem={vi.fn()}
        onShareList={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: /șterge elementul shared task din listă/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("shows an error message when the share email is invalid", async () => {
    const user = userEvent.setup();
    const onShareListMock = vi.fn();

    render(
      <ItemsList
        items={[]}
        onAddItem={vi.fn()}
        onDeleteItem={vi.fn()}
        onShareList={onShareListMock}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /partajează lista cu altcineva/i }),
    );
    await user.type(
      screen.getByRole("textbox", { name: /email pentru partajare/i }),
      "invalid-email",
    );
    await user.click(screen.getByRole("button", { name: /permite accesul/i }));

    expect(
      await screen.findByText(/completează o adresă de email validă/i),
    ).toBeInTheDocument();
    expect(onShareListMock).not.toHaveBeenCalled();
  });

  it("shows the share email field and submits a normalized email", async () => {
    const user = userEvent.setup();
    const onShareListMock = vi.fn().mockResolvedValue(undefined);

    render(
      <ItemsList
        items={[]}
        onAddItem={vi.fn()}
        onDeleteItem={vi.fn()}
        onShareList={onShareListMock}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /partajează lista cu altcineva/i }),
    );

    const input = screen.getByRole("textbox", {
      name: /email pentru partajare/i,
    });

    await user.type(input, " Friend@Example.com ");
    await user.click(screen.getByRole("button", { name: /permite accesul/i }));

    await waitFor(() => {
      expect(onShareListMock).toHaveBeenCalledWith("friend@example.com");
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("textbox", { name: /email pentru partajare/i }),
      ).not.toBeInTheDocument();
    });
  });
});
