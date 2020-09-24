import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewForm from './review-form';
import Review from './review';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import {
  reviewsLoadedSelector,
  usersLoadedSelector,
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
      <TransitionGroup className={styles.list}>
        {reviews.map((id) => (
          <CSSTransition
            key={id}
            timeout={500}
            classNames={{
              enter: styles.enter,
              enterActive: styles.enterActive,
            }}
          >
            <Review key={id} id={id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
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
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
