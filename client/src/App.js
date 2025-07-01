import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import RoutesWrapper from "./routes/routes";
import { SessionProvider } from "./Context/SessionContext";
import { UsersProvider } from "./Context/UsersContext";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins"].join(","),
    },
  });

  return (
    <div className="App">
      <SessionProvider>
        <UsersProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RoutesWrapper />
          </ThemeProvider>
        </UsersProvider>
      </SessionProvider>
    </div>
  );
}

export default App;
