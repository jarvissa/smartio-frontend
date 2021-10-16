import * as React from "react";
import UserInterface from "../interfaces/user.interface";
import http from "../utils/http.util";

type AuthContextType = {
  user: UserInterface | null;
  login: ((username: string, password: string) => Promise<void>) | null;
};

const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  } else {
    return JSON.parse(user) as UserInterface;
  }
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: null,
});

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = React.useState<UserInterface | null>(getUser());

  const save = (user: UserInterface) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const login = async (username: string, password: string) => {
    try {
      const { data } = await http.post<UserInterface>(
        process.env.REACT_APP_BASE_URL + "auth/login",
        {
          username,
          password,
        }
      );
      save(data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
