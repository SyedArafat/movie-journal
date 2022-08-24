import React, {createContext, useState} from "react";

const AuthContext = createContext({});

// export const AuthProvider = ({children}) => {
//     const [auth, setAuth] = useState({});
//
//     return (
//         <AuthContext.Provider value={{auth, setAuth}}>
//             {children}
//         </AuthContext.Provider>
//     );
// }
//
// export default AuthContext;

function useAuth() {
    const [authed, setAuthed] = useState(false);

    return {
        authed,
        login() {
            return new Promise((res) => {
                setAuthed(true);
                res();
            });
        },
        logout() {
            return new Promise((res) => {
                setAuthed(false);
                res();
            });
        },
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(AuthContext);
}
