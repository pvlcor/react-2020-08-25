import React from 'react';
import { makeOrderErrorSelector } from '../redux/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import Button from '../components/button';

function CheckoutResultPage({ error }) {
  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        <Link to="/checkout">
          <Button primary block>
            Back to checkout
          </Button>
        </Link>
      </div>
    );
  }

  return <p>Thank you for you order!</p>;
}

export default connect(
  createStructuredSelector({
    error: makeOrderErrorSelector,
  })
)(CheckoutResultPage);
