import { Star } from 'lucide-react';
import type { RatingProps } from '../../types/types';
import React from 'react';

const Rating = ({ value }: RatingProps) => {
  return (
    <div className="shrink-0 self-start min-w-0 flex gap-1 text-sm font-bold items-center">
      <h1 className="dark:text-slate-100 text-xs">
        {Number(value).toFixed(1)}
      </h1>
      <Star size={14} className="text-amber-200" fill="#FFEA00" />
    </div>
  );
};

export default React.memo(Rating);
