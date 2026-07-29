import { Star } from 'lucide-react';
import type { RatingProps } from '../../types/types';
import React from 'react';

export const Rating = ({ value }: RatingProps) => {
  return (
    <div className="flex flex-row justify-start items-center">
      <Star className="pr-1 text-amber-300" fill="#FCD34D" size={18} />
      <span>{value}</span>{' '}
    </div>
  );
};

export default React.memo(Rating);
