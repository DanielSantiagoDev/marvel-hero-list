import { useFavorites } from "../context/FavoriteContext";
import { Hero } from "../types/marvel";
import styles from "../../styles/heroCardDetailed.module.css";

interface HeroCardDetailedProps {
  hero: Hero;
}

function HeroCardDetailed({ hero }: HeroCardDetailedProps) {
  const { favorites, handleFavorite } = useFavorites();
  return (
    <div className={styles["hero-card__bg"]}>
      <div className={styles["hero-card___wrapper"]}>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
          className={styles["hero-card__image"]}
        />

        <div>
          <div className={styles["hero-card___section"]}>
            <div className={styles["hero-card__name"]}>
              <h2>{hero.name}</h2>
            </div>
            <div
              className={styles["hero-card__favorite"]}
              onClick={() => handleFavorite(hero.id)}
            >
              <img
                src={
                  favorites.has(hero.id)
                    ? "/heart_filled.svg"
                    : "/heart_empty.svg"
                }
                alt={favorites.has(hero.id) ? "Unfavorite" : "Favorite"}
                className={styles["hero-card__favorite-icon"]}
              />
            </div>
          </div>
          <div className={styles["hero-card__descripion"]}>
            <p>
              {hero.description
                ? hero.description
                : "Description is empty for this character"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCardDetailed;
