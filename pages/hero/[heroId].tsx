import React from "react";
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import { fetchHeroById, fetchAllHeroes, fetchComicsByHeroId } from "../../src/utils/marvelApi";
import { Hero, Comic } from "../../src/types/marvel";
import HeroCardDetailed from "../../src/components/HeroCardDetailed";
import ComicList from "../../src/components/ComicList";

interface Props {
  hero: Hero;
  comics: [Comic];
}

function HeroDetail({ hero, comics }: Props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <HeroCardDetailed key={hero.id} hero={hero} />
      <ComicList comics={comics} />
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const heroes = await fetchAllHeroes();
  const paths = heroes.map(hero => ({
    params: { heroId: hero.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps  = async (context) => {
  const { heroId } = context.params!;
  const hero = await fetchHeroById(heroId as string);
  const comics = await fetchComicsByHeroId(heroId as string);
  return {
    props: {
      hero,
      comics,
    },
    revalidate: 86400,
  };
};

export default HeroDetail;
