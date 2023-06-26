/* eslint-disable @typescript-eslint/no-empty-function */
import { User, createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { Image } from "../types/image";

interface IAppContext {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  addArtwork: (artwork: Image) => Promise<void>;
  removeArtwork: (artId: Image["id"]) => Promise<void>;
  userCollection: Image[] | null;
  isSupabaseLoading: boolean;
}

const AppContext = createContext<IAppContext>({
  register: async (email: string, pasword: string) => {},
  login: async (email: string, pasword: string) => {},
  logout: async () => {},
  user: null,
  addArtwork: async (artwork: Image) => {},
  removeArtwork: async (artId: Image["id"]) => {},
  userCollection: null,
  isSupabaseLoading: false,
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
  const [isSupabaseLoading, setIsSupabaseLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userCollection, setUserCollection] = useState<Image[] | null>(null);

  const register = async (email: string, password: string) => {
    setIsSupabaseLoading(true);
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
    setIsSupabaseLoading(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        console.log("data", data);
        setUser(data.user);
      } catch (error) {
        console.log("error", error);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    setIsSupabaseLoading(true);
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(data.user);
    } catch (error) {
      console.log("error", error);
    }
    setIsSupabaseLoading(false);
  };

  const logout = async () => {
    setIsSupabaseLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error", error);
    }
    setIsSupabaseLoading(false);
  };

  const addArtwork = async (artwork: Image) => {
    setIsSupabaseLoading(true);
    try {
      const { data: savedArtwork } = await supabase
        .from("artwork")
        .select("id")
        .eq("harvard_ref", artwork.harvard_ref);

      if (savedArtwork?.length === 0 || savedArtwork === null) {
        const { data: createdArtwork } = await supabase
          .from("artwork")
          .insert([
            {
              harvard_ref: artwork.harvard_ref,
              image_src: artwork.image_src,
              title: artwork.title,
              artist: artwork.artist,
              year: artwork.year,
            },
          ])
          .select();
        if (createdArtwork) {
          const savedArt = createdArtwork.find(
            (art) => art.harvard_ref === `${artwork.harvard_ref}`
          );
          await supabase
            .from("users_artwork")
            .insert([{ user_id: user?.id, artwork_id: savedArt.id }]);
        }
      } else {
        await supabase
          .from("users_artwork")
          .insert([{ user_id: user?.id, artwork_id: savedArtwork[0].id }]);
      }
      getUserCollection();
    } catch (error) {
      console.log("error", error);
    }
    setIsSupabaseLoading(false);
  };

  const removeArtwork = async (artId: Image["id"]) => {
    setIsSupabaseLoading(true);
    try {
      if (user) {
        await supabase
          .from("users_artwork")
          .delete()
          .eq("user_id", user.id)
          .eq("artwork_id", artId);
      }
      getUserCollection();
    } catch (error) {
      console.log("error", error);
    }
    setIsSupabaseLoading(false);
  };

  const getUserCollection = async () => {
    if (user) {
      const { data: users_artwork } = await supabase
        .from("users_artwork")
        .select(`artwork (*)`)
        .eq("user_id", user.id);
      console.log("users_artwork", users_artwork);
      if (users_artwork)
        setUserCollection(
          users_artwork?.map((art) => art.artwork as unknown as Image)
        );
    }
  };

  useEffect(() => {
    getUserCollection();
  }, [user]);

  return {
    register,
    user,
    logout,
    login,
    addArtwork,
    userCollection,
    removeArtwork,
    isSupabaseLoading,
  };
};
