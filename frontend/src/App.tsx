import './App.css'
import {onSigninCallback, queryClient, userManager} from "./config.ts";
import {AuthProvider, useAuth} from 'react-oidc-context';
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {BookTable} from "./BookTable.tsx";
import {SecuredPage} from "./SecuredPage.tsx";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
                    <SecuredPage>
                        <BookTable/>
                    </SecuredPage>
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
