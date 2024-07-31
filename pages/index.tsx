import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Layout from "../src/components/Layout";

interface Hero {
  id: number;
  name: string;
}

interface Props {
  heroes: Hero[];
}

function HomePage({ heroes }: Props) {
  return (
    <Layout>
      <h1>Marvel Heroes</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <Link href={`/hero/${hero.id}`}>{hero.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const heroes = [
    { id: 0, name: "test" },
    { id: 1, name: "test2" },
  ];

  return {
    props: {
      heroes,
    },
  };
};

export default HomePage;
