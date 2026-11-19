import { createContext, useContext, useState } from "react";

interface AuthInterface {
  user:
    | {
        isAuthenticated: boolean;
        setUser: Function;
      }
    | null
    | undefined;
}

const AuthContext = createContext<AuthInterface>({
  user: { isAuthenticated: false, setUser: () => {} },
});

function Auth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
export default Auth;
