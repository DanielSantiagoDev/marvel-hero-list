import React from "react";
import { useFavorites } from '../context/FavoriteContext';
import Link from "next/link";
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const router = useRouter();
  const handleFavoritesClick = () => {
    router.push('/?view=favorites');
  };
  
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <div onClick={handleFavoritesClick}>Favorites Count: {favorites.size}</div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
