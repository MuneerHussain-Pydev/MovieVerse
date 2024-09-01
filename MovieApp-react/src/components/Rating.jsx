import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

function roundToNearestHalf(value) {
  return Math.round(value * 2) / 2;
}

const Rating = ({ ratingValue }) => {
  const rating = roundToNearestHalf(ratingValue);

  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Number of half stars
  const emptyStars = 10 - fullStars - halfStar; // Number of empty stars

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} style={{ color: "gold", fontSize: "24px", marginRight: "3px" }} />
    );
  }

  // Add half star (if any)
  if (halfStar) {
    stars.push(
      <FaRegStarHalfStroke key="half" style={{ color: "gold", fontSize: "24px",marginRight: "3px" }} />
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        style={{ color: "gold", fontSize: "24px",marginRight: "3px"}}
      />
    );
  }

  return <div>{stars}</div>;
};

export default Rating;
