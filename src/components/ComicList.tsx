import { Comic } from "../types/marvel";
import styles from "../../styles/ComicList.module.css";

interface ComicListProps {
  comics: [Comic];
}

function ComicList({ comics }: ComicListProps) {
  return (
    <div className={styles["comic-list___wrapper"]}>
      <h3>Comics</h3>
      <ul className={styles["comic-list"]}>
        {comics.map((comic) => (
          <li key={comic.id} className={styles["comic-list__item"]}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className={styles["comic-list__item__image"]}
            />
            <p>{comic.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComicList;
