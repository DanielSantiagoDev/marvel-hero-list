import React from "react";
import { useRouter } from "next/router";
import { useFavorites } from "../context/FavoriteContext";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const router = useRouter();
  const handleFavoritesClick = () => {
    router.push("/?view=favorites");
  };
  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="header">
      <img
        src="/marvel_logo.png"
        alt="Marvel Logo"
        className="header__logo"
        onClick={handleLogoClick}
      />
      <div className="header__favorites" onClick={handleFavoritesClick}>
        <span className="header__favorites-count">{favorites.size}</span>
        <img
          src="/heart_filled.svg"
          alt="Favorite"
          className="header__favorite-icon"
        />
      </div>
    </header>
  );
};

export default Header;
