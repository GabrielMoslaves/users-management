import { render, screen } from "@testing-library/react";

import Login from "./login";
import { MemoryRouter } from "react-router-dom";
import { UsersProvider } from "../../Context/UsersContext";
import { SessionProvider } from "../../Context/SessionContext";
import userEvent from "@testing-library/user-event";
import { act } from "react";

test("should render correctly", () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );

  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /cadastre\-se aqui/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", {
      name: /logo/i,
    })
  ).toBeInTheDocument();
});

test("should navigate correctly", () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );

  const createAccountLink = screen.getByRole("link", {
    name: /cadastre\-se aqui/i,
  });

  expect(createAccountLink.getAttribute("href")).toBe("/criar-uma-conta");
});

test("should validate empty fields", async () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );
  const loginButton = screen.getByRole("button", {
    name: /login/i,
  });

  await act(async () => {
    userEvent.click(loginButton);
  });

  expect(screen.getAllByText(/campo obrigatório/i)).toHaveLength(2);
});
