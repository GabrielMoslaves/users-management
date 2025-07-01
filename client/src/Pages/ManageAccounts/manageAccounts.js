import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import TextField from "../../Components/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import UsersTable from "./Table";
import CreateAccountModal from "./Modal/modal";
import { useUsers } from "../../Providers/UsersProvider";
import { useSession } from "../../Providers/SessionProvider";

const ManageAccounts = () => {
  const [searchText, setSearchText] = useState("");
  const [accountTypeAdmin, setAccountTypeAdmin] = useState(true);
  const [accountTypeUser, setAccountTypeUser] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { session } = useSession();
  const { users, fetchUsers } = useUsers();

  const filteredUsers = useMemo(() => {
    const filterByText = users.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        searchText === ""
    );
    const filterByAccountType = filterByText.filter((item) => {
      if (accountTypeAdmin && !accountTypeUser)
        return item.accountType === "admin";
      if (accountTypeUser && !accountTypeAdmin)
        return item.accountType === "user";
      if (accountTypeUser && accountTypeAdmin) return true;
    });

    return filterByText && filterByAccountType;
  }, [searchText, users, accountTypeUser, accountTypeAdmin]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box className={styles.container}>
      <Typography variant="h4">Usuários</Typography>
      <TextField
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="search"
      />
      <FormGroup>
        <Box display="flex">
          <FormControlLabel
            checked={accountTypeAdmin}
            onChange={() => setAccountTypeAdmin((prevState) => !prevState)}
            control={<Checkbox />}
            label="Admin"
          />
          <FormControlLabel
            checked={accountTypeUser}
            onChange={() => setAccountTypeUser((prevState) => !prevState)}
            control={<Checkbox />}
            label="User"
          />
        </Box>
      </FormGroup>
      <UsersTable
        fetchUsers={fetchUsers}
        filteredUsers={filteredUsers}
        accountTypeAdmin={accountTypeAdmin}
        accountTypeUser={accountTypeUser}
        searchText={searchText}
      />
      {session?.accountType === "admin" && (
        <Button
          onClick={() => setShowModal(true)}
          sx={{ width: "fit-content" }}
          variant="contained"
        >
          Criar usuário
        </Button>
      )}

      <CreateAccountModal
        show={showModal}
        setShowModal={setShowModal}
        fetchUsers={fetchUsers}
      />
    </Box>
  );
};

export default ManageAccounts;
