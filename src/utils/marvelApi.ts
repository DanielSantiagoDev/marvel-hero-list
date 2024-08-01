import cache from "memory-cache";

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

const baseUrl = `https://gateway.marvel.com/v1/public`;

const ts = new Date().getTime();
const hash = require("crypto")
  .createHash("md5")
  .update(ts + privateKey + publicKey)
  .digest("hex");

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1day

export const fetchAllHeroes = async () => {
  const cacheKey = "allHeroes11";
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  const url = `${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=25`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch heroes");
  }
  const data = await response.json();
  cache.put(cacheKey, data.data.results, CACHE_DURATION);
  return data.data.results;
};

export const fetchHeroById = async (id: string) => {
  const cacheKey = `hero_${id}`;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  const url = `${baseUrl}/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch hero with id ${id}`);
  }
  const data = await response.json();
  cache.put(cacheKey, data.data.results[0], CACHE_DURATION);
  return data.data.results[0];
};

export const fetchComicsByHeroId = async (id: string) => {
  const cacheKey = `hero_${id}_comics`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  const url = `${baseUrl}/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch hero with id ${id}`);
  }
  const data = await response.json();
  cache.put(cacheKey, data.data.results, CACHE_DURATION);
  return data.data.results;
};
