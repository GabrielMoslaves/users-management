import { render, screen } from "@testing-library/react";
import { SessionProvider } from "../../Context/SessionContext";
import { UsersProvider } from "../../Context/UsersContext";
import { MemoryRouter } from "react-router-dom";
import MainNav from "./mainNav";

test("should render correctly", () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );

  expect(
    screen.getByRole("img", {
      name: /logo/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /usuários/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /gerenciar perfil/i,
    })
  ).toBeInTheDocument();
});

test("should navigate correctly", () => {
  render(
    <SessionProvider>
      <UsersProvider>
        <MemoryRouter>
          <MainNav />
        </MemoryRouter>
      </UsersProvider>
    </SessionProvider>
  );

  expect(
    screen.getByRole("link", {
      name: /sair/i,
    })
  ).toHaveAttribute("href", "/");
});
