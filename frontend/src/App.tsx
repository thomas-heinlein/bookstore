import './App.css'
import {onSigninCallback, queryClient, userManager} from "./config";
import {AuthProvider} from 'react-oidc-context';
import {QueryClientProvider} from "@tanstack/react-query";
import {SecuredPage} from "./SecuredPage";
import {BrowserRouter, Route, Routes} from "react-router";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import BookTable from "./pages/BookTable";
import BookCreation from "./pages/BookCreation";
import Stack from '@mui/material/Stack';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
                        <SecuredPage>
                            <BrowserRouter>
                                <Stack spacing={5}>
                                    <NavBar/>
                                    <main className="main-content">
                                        <Routes>
                                            <Route path="/" element={<Home/>}/>
                                            <Route path="/books" element={<BookTable/>}/>
                                            <Route path="/books/create" element={<BookCreation/>}/>
                                        </Routes>
                                    </main>
                                </Stack>
                            </BrowserRouter>
                        </SecuredPage>
                    </AuthProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default App
