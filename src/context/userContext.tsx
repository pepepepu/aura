import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUserInfo, type UserInfo } from "../services/lastFMServices";

interface UserContextType {
  userInfo: UserInfo | null;
}

export const UserContext = createContext<UserContextType>({ userInfo: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      if (data) {
        setUserInfo(data);
      }
    };

    if (window.localStorage.getItem("lastfm_username")) {
      fetchUserInfo();
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
  );
};
