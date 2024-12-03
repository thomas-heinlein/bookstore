import './App.css'
import {onSigninCallback, queryClient, userManager} from "./config.ts";
import {AuthProvider, useAuth} from 'react-oidc-context';
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {BookTable} from "./BookTable.tsx";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
                    <BookTable/>
                </AuthProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
