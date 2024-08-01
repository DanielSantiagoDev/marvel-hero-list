import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import { fetchHeroById, fetchComicsByHeroId } from "../../src/utils/marvelApi";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { heroId } = context.params!;
  const hero = await fetchHeroById(heroId as string);
  const comics = await fetchComicsByHeroId(heroId as string);
  return {
    props: {
      hero,
      comics,
    },
  };
};

export default HeroDetail;
