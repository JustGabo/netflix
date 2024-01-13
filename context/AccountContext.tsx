import React, { createContext, useContext, useEffect, useState } from "react";

import { Account } from "@/types/index";
import { supabase } from "@/db/supabase";
import { useUserContext } from "./UserContext";

interface AccountProps {
  children: React.ReactNode;
}

interface AccountState {
  account: Account | null;
}

const initialState = {
  account: null,
};

const AccountContext = createContext<AccountState>(initialState);

const AccountContextProvider = ({ children }: AccountProps) => {
  const [account, setAccount] = useState<Account | null>(null);
  const { user } = useUserContext();

  const gettingAccount = async () => {
    const { data } = await supabase.from("users").select("*").single();
    setAccount(data);
  };

  const value = {
    account,
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        gettingAccount();
      }, 2000);
    }
  }, [user]);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export default AccountContextProvider;

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  return context;
};
