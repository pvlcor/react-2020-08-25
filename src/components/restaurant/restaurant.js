import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';

import { connect } from 'react-redux';
import { averageRatingSelector } from '../../redux/selectors';
import styles from './restaurant.module.css';

const Restaurant = ({ id, name, averageRating }) => {
  const tabs = [
    { path: 'menu', title: 'Menu' },
    { path: 'reviews', title: 'Reviews' },
  ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      <div className={styles.tabs}>
        {tabs.map(({ title, path }, index) => (
          <NavLink
            key={`${path}-${index}`}
            to={`/restaurants/${id}/${path}`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {title}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path="/restaurants/:restId/menu" component={Menu} />
        <Route path="/restaurants/:restId/reviews" component={Reviews} />
        <Route path="/restaurants/:restId" component={Menu} />
      </Switch>
    </div>
  );
};

Restaurant.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  menu: PropTypes.array,
  reviews: PropTypes.array,
  averageRating: PropTypes.number,
};

export default connect(
  createStructuredSelector({
    averageRating: averageRatingSelector,
  })
)(Restaurant);
