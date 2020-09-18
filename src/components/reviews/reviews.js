import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewForm from './review-form';
import Review from './review';
import Loader from '../loader';
import styles from './reviews.module.css';
import {
  restaurantReviewsLoadedSelector,
  reviewsLoadingSelector,
  usersLoadingSelector,
  usersLoadedSelector,
  reviewsListSelector,
} from '../../redux/selectors';

import { loadReviews, loadUsers } from '../../redux/actions';

const Reviews = ({
  reviews,
  restaurantId,
  loadReviews,
  loadUsers,
  reviewsLoaded,
  reviewsLoading,
  usersLoading,
  usersLoaded,
}) => {
  useEffect(() => {
    if (!usersLoading && !usersLoaded) {
      loadUsers();
    }

    if (!reviewsLoading && !reviewsLoaded) {
      loadReviews(restaurantId);
    }
  }, [restaurantId]); // eslint-disable-line

  if (reviewsLoading || !reviewsLoaded || usersLoading || !usersLoaded) {
    return <Loader />;
  }

  return (
    <div className={styles.reviews}>
      {reviews.map(({ id }) => (
        <Review key={id} id={id} restaurantId={restaurantId} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
  (state, props) => ({
    reviews: reviewsListSelector(state, props),
    reviewsLoaded: restaurantReviewsLoadedSelector(state, props),
    reviewsLoading: reviewsLoadingSelector(state),
    usersLoading: usersLoadingSelector(state),
    usersLoaded: usersLoadedSelector(state),
  }),
  { loadReviews, loadUsers }
)(Reviews);
