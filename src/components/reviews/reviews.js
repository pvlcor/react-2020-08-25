import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewForm from './review-form';
import Review from './review';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import {
  reviewsLoadedSelector,
  usersLoadedSelector,
  restaurantReviewsSelector,
  restaurantIdSelector,
} from '../../redux/selectors';

import Loader from '../loader';

const Reviews = ({
  reviews,
  restaurantId,
  loadReviews,
  loadUsers,
  usersLoaded,
  reviewsLoaded,
}) => {
  useEffect(() => {
    loadUsers();
    loadReviews(restaurantId);
  }, [restaurantId]); // eslint-disable-line

  if (!usersLoaded || !reviewsLoaded) return <Loader />;

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = createStructuredSelector({
  reviewsLoaded: reviewsLoadedSelector,
  usersLoaded: usersLoadedSelector,
  reviews: restaurantReviewsSelector,
  restaurantId: restaurantIdSelector,
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
