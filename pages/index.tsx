import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useFavorites } from '../src/context/FavoriteContext';
import Layout from "../src/components/Layout";

interface Hero {
  id: number;
  name: string;
}

interface Props {
  heroes: Hero[];
}

function HomePage({ heroes }: Props) {

  const router = useRouter();
  const { favorites, handleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>(heroes);
  const viewFavorites = router.query.view === 'favorites';
  
  useEffect(() => {
    const filtered = heroes.filter(hero => {
      const isFavorite = favorites.has(hero.id);
      const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (viewFavorites) {
        return isFavorite && matchesSearch;
      } else {
        return matchesSearch;
      }
    });

    setFilteredHeroes(filtered);
  }, [searchTerm, viewFavorites, heroes, favorites]);

  return (
    <Layout>
      <h1>Marvel Heroes</h1>
      <input
        type="text"
        placeholder="Search heroes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredHeroes.map((hero) => (
          <li key={hero.id}>
            <Link href={`/hero/${hero.id}`}>{hero.name}</Link>
            <button onClick={() => handleFavorite(hero.id)}>
              {favorites.has(hero.id) ? 'Unfavorite' : 'Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const heroes = [
    { id: 0, name: "lorem" },
    { id: 1, name: "ipsum" },
  ];

  return {
    props: {
      heroes,
    },
  };
};

export default HomePage;
