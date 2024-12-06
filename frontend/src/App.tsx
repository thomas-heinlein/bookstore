import './App.css'
import {onSigninCallback, queryClient, userManager} from "./config.ts";
import {AuthProvider} from 'react-oidc-context';
import {QueryClientProvider} from "@tanstack/react-query";
import {SecuredPage} from "./SecuredPage.tsx";
import {Router} from "@mui/icons-material";
import {BrowserRouter, Route, Routes} from "react-router";
import NavBar from "./components/NavBar.tsx";
import {Home} from "./pages/Home.tsx";
import BookTable from "./pages/BookTable.tsx";
import BookCreation from "./pages/BookCreation.tsx";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
                    <SecuredPage>
                        <BrowserRouter>
                            <NavBar/>
                            <main className="main-content">
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/books" element={<BookTable/>}/>
                                    <Route path="/create-book" element={<BookCreation/>}/>
                                </Routes>
                            </main>
                        </BrowserRouter>
                    </SecuredPage>
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
