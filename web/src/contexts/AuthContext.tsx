"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../constants/auth";

import {
  getStorageModel,
  removeStorage,
  setStorageModel,
} from "../utils/storage";
import axios from "axios";
import { toast } from "react-toastify";
import { apiClient } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  email: string;
  password: string;
};

type UserAuth = {
  userId: Number;
  email: String;
  name: String;
  experience: String;
  level: String;
  mana: Number;
  ranking: String;
  stamina: Number;
  avatarUrl: String;
  avatarBorderUrl: String;
  firstDeckBox: Boolean;
  Decks: any;
};

interface AuthContextData {
  loading: boolean;
  isAuthenticated: boolean;
  signIn: any;
  signOut: () => void;
  user: UserAuth | undefined;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserAuth>();

  useEffect(() => {
    const token = getStorageModel(auth.TOKEN);
    const checkUser = getStorageModel(auth.USER);

    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(checkUser));
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn(login: User) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        login
      );

      const objToStrig = JSON.stringify({
        userId: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        experience: response.data.user.experience,
        level: response.data.user.level,
        mana: response.data.user.mana,
        ranking: response.data.user.ranking,
        stamina: response.data.user.stamina,
        avatarUrl: response.data.user.avatarUrl,
        avatarBorderUrl: response.data.user.avatarBorderUrl,
        firstDeckBox: response.data.user.firstDeckBox,
        Decks: response.data.user.Decks,
      });

      setStorageModel(auth.TOKEN, response.data.token);
      // setStorageModel(auth.REFRESH_TOKEN, response.data.tokens.refreshToken);
      setStorageModel(auth.USER, objToStrig);
      setIsAuthenticated(true);

      apiClient().defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data?.token}`;

      toast.success(
        "Olá! Que bom te ver por aqui, seu login foi um sucesso! 😍",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      const timeOutRedirect = setTimeout(() => {
        window.location.href = "/";
      }, 1);

      return () => clearTimeout(timeOutRedirect);
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function signOut() {
    setIsAuthenticated(false);
    removeStorage(auth.TOKEN);
    removeStorage(auth.REFRESH_TOKEN);
    removeStorage(auth.USER);

    toast.success("Ahhh, você já está indo? Isso será um até logo! 😁", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        signIn,
        signOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
