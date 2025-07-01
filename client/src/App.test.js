import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react";

test("should render login button", () => {
  render(<App />);
  const loginButton = screen.getByRole("button", {
    name: /login/i,
  });
  expect(loginButton).toBeInTheDocument();
});

test("should navigate to create account form", async () => {
  render(<App />);

  const createAccountLink = screen.getByRole("link", {
    name: /cadastre\-se aqui/i,
  });

  expect(createAccountLink.getAttribute("href")).toBe("/criar-uma-conta")

  
  await act(async () => {
    userEvent.click(createAccountLink);
  });

  await waitFor(async () => {
    expect(
      screen.getByRole("button", {
        name: /criar conta/i,
      })
    ).toBeInTheDocument();
  });
});
