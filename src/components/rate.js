import React from 'react';
import Star from '../icons/star';

const MAX_RATING = 5;

export default function Rate({ rating }) {
  const stars = Array(MAX_RATING).fill('*');
  const mapStar = (str, i) => (
    <Star key={`${str}_${i}`} fillColor={i < rating ? 'red' : 'lightgray'} />
  );

  return <div>{stars.map(mapStar)}</div>;
}
