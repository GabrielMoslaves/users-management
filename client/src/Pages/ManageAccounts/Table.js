import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../Providers/UsersProvider";
import { useSession } from "../../Providers/SessionProvider";

export default function UsersTable({ filteredUsers }) {
  const navigate = useNavigate();
  const { session } = useSession();
  const { handleDeleteUser } = useUsers();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Tipo de conta</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Telefone</TableCell>
            {session?.accountType === "admin" && (
              <TableCell align="left">Ações</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {user.accountType}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>

              <TableCell align="left">{user.phone}</TableCell>
              {session?.accountType === "admin" && (
                <TableCell align="left">
                  <BorderColorOutlinedIcon
                    data-test-id="testinho"
                    onClick={() => navigate(`/perfil-do-usuario/${user.id}`)}
                  />
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
