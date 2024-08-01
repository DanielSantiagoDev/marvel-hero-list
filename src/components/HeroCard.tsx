import { useFavorites } from "../context/FavoriteContext";
import { Hero } from "../types/marvel";
import styles from "../../styles/heroCard.module.css";

interface HeroCardProps {
  hero: Hero;
}

function HeroCard({ hero }: HeroCardProps) {
  const { favorites, handleFavorite } = useFavorites();

  return (
    <div className={styles["hero-card___wrapper"]}>
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className={styles["hero-card__image"]}
      />

      <div className={styles["hero-card___section"]}>
        <div className={styles["hero-card__name"]}>{hero.name}</div>
        <div
          className={styles["hero-card__favorite"]}
          onClick={() => handleFavorite(hero.id)}
        >
          <img
            src={
              favorites.has(hero.id) ? "/heart_filled.svg" : "/heart_empty.svg"
            }
            alt={favorites.has(hero.id) ? "Unfavorite" : "Favorite"}
            className={styles["hero-card__favorite-icon"]}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
