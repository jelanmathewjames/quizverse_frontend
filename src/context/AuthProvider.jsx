import { createContext,useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  return (
    <AuthContext.Provider value={{auth, setAuth, persist, setPersist}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};