import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps  } from "next";
import { useFavorites } from "../src/context/FavoriteContext";
import Layout from "../src/components/Layout";
import { fetchAllHeroes } from "../src/utils/marvelApi";
import { Hero } from "../src/types/marvel";
import HeroCard from "../src/components/HeroCard";
import styles from "../styles/index.module.css";

interface Props {
  heroes: Hero[];
}

function HomePage({ heroes }: Props) {
  const router = useRouter();
  const { favorites, handleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>(heroes);
  const viewFavorites = router.query.view === "favorites";

  useEffect(() => {
    const filtered = heroes.filter((hero) => {
      const isFavorite = favorites.has(hero.id);
      const matchesSearch = hero.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (viewFavorites) {
        return isFavorite && matchesSearch;
      }
      return matchesSearch;
    });

    setFilteredHeroes(filtered);
  }, [searchTerm, viewFavorites, heroes, favorites]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="SEARCH A CHARACTER..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />
          <div className={styles.results}>{filteredHeroes.length} Results</div>
        </div>

        {viewFavorites && <h2>Favorite Heroes</h2>}
        <ul className={styles["hero-list"]}>
          {filteredHeroes.map((hero) => (
            <li key={hero.id} className={styles["hero-card"]}>
              <Link href={`/hero/${hero.id}`}>
                <HeroCard key={hero.id} hero={hero} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps  = async () => {
  const heroes = await fetchAllHeroes();

  return {
    props: {
      heroes,
    },
    revalidate: 86400,
  };
};

export default HomePage;
