import {FC, ReactNode, useEffect, useState} from "react";
import {hasAuthParams, useAuth} from "react-oidc-context";

interface SecuredPageProps {
    children: ReactNode;
}

export const SecuredPage: FC = (props) => {
    const {children} = props;

    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = useState(false);

    useEffect(() => {
        if (!(hasAuthParams() || auth.isAuthenticated || auth.activeNavigator || auth.isLoading || hasTriedSignin)) {
            void auth.signinRedirect();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);

    return (<>{children}</>);
}