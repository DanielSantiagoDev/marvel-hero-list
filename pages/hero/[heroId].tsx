import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import { useFavorites } from '../../src/context/FavoriteContext';

interface Hero {
  id: number;
  name: string;
}

interface Props {
  hero: Hero;
}

function HeroDetail({ hero }: Props) {
  const router = useRouter();
  const { favorites, handleFavorite } = useFavorites();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>{hero.name}</h1>
      <p>{hero.id}</p>
      <button onClick={() => handleFavorite(hero.id)}>
        {favorites.has(hero.id) ? 'Unfavorite' : 'Favorite'}
      </button>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { heroId } = context.params!;
  const hero: Hero = { id: Number(heroId), name: "test2" };

  return {
    props: {
      hero,
    },
  };
};

export default HeroDetail;
