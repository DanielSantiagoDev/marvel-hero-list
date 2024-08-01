import React from "react";
import { AppProps } from "next/app";
import { FavoriteProvider } from "../src/context/FavoriteContext";
import "../styles/global.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <FavoriteProvider>
      <Component {...pageProps} />
    </FavoriteProvider>
  );
};

export default MyApp;
