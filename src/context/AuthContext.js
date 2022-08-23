import React, {useContext, useState} from "react";
import instance from "../axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();

    function signup(name, email, password) {
        instance().get();
    }

    const value = {
        currentUser

    }
    return (
        <AuthContext.provider value={value}>
            {children}
        </AuthContext.provider>
    );
}
