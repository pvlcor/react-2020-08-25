import React from 'react';
import Rate from './rate';

export default function Reviews({ reviews }) {
  const mapReview = ({ id, user, text, rating }) => (
    <div key={id}>
      <Rate rating={rating} />
      <div>
        <b>{user}</b>: <i>{text}</i>
      </div>
    </div>
  );

  return <div className="reviews">{reviews.map(mapReview)}</div>;
}
