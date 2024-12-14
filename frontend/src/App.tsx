import "./App.css";
import { onSigninCallback, queryClient, userManager } from "./config";
import { AuthProvider } from "react-oidc-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { SecuredPage } from "./SecuredPage";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import BookTable from "./pages/BookTable";
import BookCreation from "./pages/BookCreation";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { enUS } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import BookView from "./pages/BookView";
import BookEdit from "./pages/BookEdit";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={"en"}
      localeText={
        enUS.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider
            userManager={userManager}
            onSigninCallback={onSigninCallback}
          >
            <SecuredPage>
              <ConfirmProvider>
                <BrowserRouter>
                  <Stack spacing={5}>
                    <NavBar />
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/books" element={<BookTable />} />
                        <Route
                          path="/books/details/:id"
                          element={<BookView />}
                        />
                        <Route path="/books/:id" element={<BookEdit />} />
                        <Route
                          path="/books/register"
                          element={<BookCreation />}
                        />
                      </Routes>
                    </main>
                  </Stack>
                </BrowserRouter>
              </ConfirmProvider>
            </SecuredPage>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
