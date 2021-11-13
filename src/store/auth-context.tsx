import * as React from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);

      setUser(user);
      setLoading(false);
      unsubscribe();
    });
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), { email });
      setUser(res.user);
    } catch (err) {
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
