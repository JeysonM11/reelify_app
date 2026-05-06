import StarRating from "./StarRating";
import { formatDate } from "../../utils/movieStats";
import { useApp } from "../../contexts/AppContext";

export default function ReviewCard({ review, user, movie }) {
  const { getUserById, getMovieById } = useApp();

  if (!review) return null;

  const userData = user || getUserById(review.userId) || { name: "Viewer", avatar: "" };
  const movieData = movie || getMovieById(review.movieId) || null;

  return (
    <article className="review-card" aria-label={`Reseña de ${userData.name}`}>
      <img src={userData.avatar} alt={`${userData.name} avatar`} className="review-avatar" />
      <div className="review-body">
        <div className="review-head">
          <div>
            <p className="review-name">{userData.name}</p>
            <p className="review-meta">{movieData?.title ? `${movieData.title} · ` : ""}{formatDate(review.createdAt)}</p>
          </div>
          <StarRating value={review.rating} size="sm" label={`Calificación de ${review.rating} estrellas`} />
        </div>
        <p className="review-comment">{review.comment}</p>
      </div>
    </article>
  );
}
