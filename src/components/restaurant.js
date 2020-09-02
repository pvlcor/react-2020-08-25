import React from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({ menu, reviews }) {
  const averageRating =
    reviews.map(({ rating }) => rating).reduce((a, b) => a + b, 0) /
    reviews.length;

  return (
    <div className="restaurant">
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
      <div>
        <div>
          <b>Average rating:</b>
        </div>
        <Rate rating={averageRating} />
      </div>
    </div>
  );
}
