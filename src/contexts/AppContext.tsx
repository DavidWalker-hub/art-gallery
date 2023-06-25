/* eslint-disable @typescript-eslint/no-empty-function */
import { User, createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface IAppContext {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const AppContext = createContext<IAppContext>({
  register: async (email: string, pasword: string) => {},
  login: async (email: string, pasword: string) => {},
  logout: async () => {},
  user: null,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useAppContextStore();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

const useAppContextStore = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [user, setUser] = useState<User | null>(null);

  const register = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      setUser(data.user);
      console.log("error", error);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      console.log("data", data);
      setUser(data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(data.user);
      console.log("error", error);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  return { register, user, logout, login };
};
