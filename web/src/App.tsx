"use client";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useAuth } from "./hooks/useAuth";
import { Topbar } from "./components/Topbar";
import { DeckCreation } from "./components/DeckCreation";
import { Highscores } from "./components/Highscores";
import { Chest } from "./components/Chest";
import { CardStock } from "./components/CardStock";
import { GameBoard } from "./components/GameBoard";
import { auth } from "./constants/auth";
import { getStorageModel } from "./utils/storage";

import HeaderImage from "./assets/header.png";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const { user, isAuthenticated } = useAuth();

  const userData = isAuthenticated
    ? JSON.parse(getStorageModel(auth.USER))
    : null;

  return (
    //  main container
    // <main
    //   className="flex justify-center items-center h-screen w-screen leading-normal tracking-normal text-indigo-400 bg-cover bg-fixed relative"
    //   style={{ backgroundImage: `url(${HeaderImage.src})` }}
    // >
    //   <ToastContainer />
    //   <Topbar />
    //   <Chest data={userData} />
    //   {!user?.firstDeckBox && <DeckCreation />}
    //   <div className="w-full m-10 flex justify-between items-center">
    //     {user?.firstDeckBox && <CardStock data={userData} />}

    //     <Highscores />
    //   </div>
    // </main>
    <main
      className="flex justify-center items-center h-screen w-screen leading-normal tracking-normal text-indigo-400 bg-cover bg-fixed relative"
      style={{ backgroundImage: `url(${HeaderImage})` }}
    >
      <ToastContainer />
      <GameBoard />
    </main>
  );
}
