import { render, screen, waitFor, within } from "@testing-library/react";
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

const mock = new MockAdapter(axios);

beforeAll(() => {
  mock.onGet("http://localhost:3001/accounts").reply(200, mockedUsers);
  mock.onDelete("http://localhost:3001/accounts/6d2d").reply(200);
  mock.onPost("http://localhost:3001/accounts").reply(200, {
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
        <MemoryRouter>
          <ManageAccounts />
        </MemoryRouter>
      </UsersProvider>
    </SessionContext.Provider>
  );
};

test("should render correctly", () => {
  init();

  expect(screen.getByRole("textbox")).toBeInTheDocument();

  expect(
    screen.getByRole("columnheader", {
      name: /telefone/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", {
      name: /nome/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", {
      name: /tipo de conta/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", {
      name: /email/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /usuários/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /criar usuário/i,
    })
  ).toBeInTheDocument();

});

test("should open create account modal", async () => {
  init();

  expect(
    screen.getByRole("button", {
      name: /criar usuário/i,
    })
  ).toBeInTheDocument();

  await act(
    async () =>
      await userEvent.click(
        screen.getByRole("button", {
          name: /criar usuário/i,
        })
      )
  );

  expect(
    screen.getByRole("button", {
      name: /criar conta/i,
    })
  ).toBeInTheDocument();
});

test("should delete user", async () => {
  init();

  const row = await screen.findByRole("row", {
    name: /admin admin admin@gmail\.com \(61\) 12345\-6789/i,
  });

  expect(row).toBeInTheDocument();

  await act(
    async () =>
      await userEvent.click(
        within(row).getByTestId("DeleteOutlineOutlinedIcon")
      )
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: /sim, exclua o usuário!/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: /excluído!/i,
    })
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("button", {
      name: /ok/i,
    })
  );

  await waitFor(() =>
    expect(
      screen.queryByRole("row", {
        name: /admin admin admin@gmail\.com 123456789/i,
      })
    ).not.toBeInTheDocument()
  );
});
