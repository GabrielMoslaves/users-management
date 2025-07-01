import { render, screen } from "@testing-library/react";
import { SessionProvider } from "../../Context/SessionContext";
import { UsersProvider } from "../../Context/UsersContext";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./signUp";
import { act } from "react";
import userEvent from "@testing-library/user-event";

test("should render correctly", () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );

  expect(screen.getAllByRole("textbox")).toHaveLength(3);
  expect(screen.getByText(/senha/i)).toBeInTheDocument();

});

test("should validate empty fields", async () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );

  const loginButton = screen.getByRole("button", {
    name: /criar conta/i,
  });

  await act(async () => {
    userEvent.click(loginButton);
  });

  expect(screen.getAllByText(/campo obrigatório/i)).toHaveLength(4);
});
