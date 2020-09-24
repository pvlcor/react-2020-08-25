import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Restaurants from '../components/restaurants';
import Loader from '../components/loader';
import {
  restaurantsListSelector,
  restaurantsLoadingSelector,
  restaurantsLoadedSelector,
} from '../redux/selectors';
import { loadRestaurants } from '../redux/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

function RestaurantsPage({
  restaurants,
  loadRestaurants,
  loading,
  loaded,
  match,
  history,
}) {
  useEffect(() => {
    if (!loading && !loaded) loadRestaurants();
  }, []); // eslint-disable-line

  if (loading || !loaded) return <Loader />;

  return (
    <Switch>
      <Route path="/restaurants/:restId" component={Restaurants} />
      <Redirect from="/restaurants" to={`/restaurants/${restaurants[0].id}`} />
    </Switch>
  );
}

export default connect(
  createStructuredSelector({
    restaurants: restaurantsListSelector,
    loading: restaurantsLoadingSelector,
    loaded: restaurantsLoadedSelector,
  }),
  { loadRestaurants }
)(RestaurantsPage);
