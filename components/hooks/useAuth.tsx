import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebaseConfig";

const useAuth = () => {
  const [error, seterror] = useState<unknown>("");
  const [loading, setloading] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const router = useRouter();

  const signupResidents = async (email: string, password: string) => {
    try {
      setloading(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setloading(false);
      setisAuthenticated(true);
      return user;
    } catch (error) {
      console.log(error);
      seterror(error);
      setloading(false);
    }
  };

  const loginUsers = async (email: string, password: string) => {
    try {
      setloading(true);
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setloading(false);
      setisAuthenticated(true);
      return user;
    } catch (error) {
      console.log(error);
      seterror(error);
      setloading(false);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return { signupResidents, loginUsers, logOut };
};

export default useAuth;
