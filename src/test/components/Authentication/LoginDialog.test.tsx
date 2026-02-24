import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LoginDialog from "src/components/Authentication/LoginDialog";

const handleGoogleLoginMock = vi.fn();

vi.mock("src/hooks/AuthContext", () => ({
  useAuthContext: () => ({
    handleGoogleLogin: handleGoogleLoginMock,
  }),
}));

describe("LoginDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls google login when auth button is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginDialog />);

    await user.click(
      screen.getByRole("button", { name: /autentificare cu google/i }),
    );

    expect(handleGoogleLoginMock).toHaveBeenCalledTimes(1);
  });
});
