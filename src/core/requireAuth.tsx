import { Navigate } from "react-router-dom";

interface Props {
    children: any;
    redirectTo: string;
}

export const RequireAuth = ({ children, redirectTo }: Props) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
