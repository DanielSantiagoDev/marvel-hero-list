import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";

interface Hero {
  id: number;
  name: string;
}

interface Props {
  hero: Hero;
}

function HeroDetail({ hero }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>{hero.name}</h1>
      <p>{hero.id}</p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { heroId } = context.params!;
  const hero = { id: heroId, name: "test2" };

  return {
    props: {
      hero,
    },
  };
};

export default HeroDetail;
