import './App.css'
import {onSigninCallback, queryClient, userManager} from "./config.ts";
import {AuthProvider, useAuth} from 'react-oidc-context';
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {SecuredPage} from "./SecuredPage.tsx";
import {BookTable} from "./components/BookTable.tsx";
import {BookCreation} from "./components/BookCreation.tsx";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
                    <SecuredPage>
                        <BookTable/>
                        <BookCreation/>
                    </SecuredPage>
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
