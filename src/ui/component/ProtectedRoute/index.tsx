import React, {useEffect} from 'react';
import {Route, useHistory, useLocation} from "react-router-dom";
import AuthService from "../../../service/AuthService";

type Props = {
    path: string,
    children: React.ReactNode
};

export default function ProtectedRoute(props: Props) {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!AuthService.user) {
            alert("Please sign in before access");
            history.push(`/sign-in?from=${location.pathname}`);
        }
    }, []);

    if (AuthService.user) {
        return (
            <Route exact path={props.path}>
                {props.children}
            </Route>
        );
    } else {
        return null;
    }
}