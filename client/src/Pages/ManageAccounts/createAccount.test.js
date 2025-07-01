import { render, screen, within } from "@testing-library/react";
import { SessionContext } from "../../Context/SessionContext";
import { UsersProvider } from "../../Context/UsersContext";
import { MemoryRouter } from "react-router-dom";
import ManageAccounts from "./manageAccounts";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockedUsers } from "./mocks";
import { v4 as uuidv4 } from "uuid";

global.scrollTo = jest.fn();

const mock = new MockAdapter(axios);

beforeAll(() => {
  window.history.pushState({}, "", "/gerenciamento-de-contas");

  mock.onGet("http://localhost:3001/accounts").reply(200, []);
  mock.onDelete("http://localhost:3001/accounts/6d2d").reply(200);
  mock.onPost("http://localhost:3001/accounts").reply(201, {
    ...mockedUsers[0],
    id: uuidv4(),
  });
});

afterAll(() => {
  mock.resetHandlers();
});

const session = {
  accountType: "admin",
};

const init = () => {
  return render(
    <SessionContext.Provider value={{ session }}>
      <UsersProvider>
        <MemoryRouter initialEntries={["/gerenciamento-de-contas"]}>
          <ManageAccounts />
        </MemoryRouter>
      </UsersProvider>
    </SessionContext.Provider>
  );
};

test("should create user", async () => {
  init();

  expect(
    screen.getByRole("button", {
      name: /criar usuário/i,
    })
  ).toBeInTheDocument();

  await act(async () => {
    await userEvent.click(
      screen.getByRole("button", {
        name: /criar usuário/i,
      })
    );
  });

  const nameInput = within(screen.getByTestId("textbox name")).getByRole(
    "textbox"
  );
  const emailInput = within(screen.getByTestId("textbox email")).getByRole(
    "textbox"
  );
  const phoneInput = within(screen.getByTestId("textbox phone")).getByRole(
    "textbox"
  );
  const passwordInput = screen.getByLabelText(/senha/i);

  await act(async () => {
    await userEvent.type(nameInput, "usuario");
    await userEvent.type(emailInput, "usuario@gmail.com");
    await userEvent.type(phoneInput, "22222222222");
    await userEvent.type(passwordInput, "123456");
  });

  expect(nameInput).toHaveValue("usuario");
  expect(emailInput).toHaveValue("usuario@gmail.com");
  expect(phoneInput).toHaveValue("(22) 22222-2222");
  expect(passwordInput).toHaveValue("123456");

  await act(async () => {
    await userEvent.click(
      screen.getByRole("button", {
        name: /criar conta/i,
      })
    );
  });

  expect(screen.queryAllByText("Campo obrigatório")).toHaveLength(0);

  expect(
    await screen.findByRole("dialog", {
      name: /usuário criado!/i,
    })
  ).toBeInTheDocument();

  await act(async () => {
    await userEvent.click(
      screen.getByRole("button", {
        name: /ok/i,
      })
    );
  });

  expect(
    await screen.findByRole("row", {
      name: /admin admin admin@gmail\.com \(61\) 12345\-6789/i,
    })
  ).toBeInTheDocument();
});
