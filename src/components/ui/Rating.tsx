import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  max?: number;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, max = 5, size = 20 }) => {
  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}
        />
      ))}
    </div>
  );
};

export default Rating;