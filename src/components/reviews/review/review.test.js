import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Review from './review';
import { restaurants } from '../../../fixtures';

const [{ reviews }] = restaurants;

Enzyme.configure({ adapter: new Adapter() });

describe('Review', () => {
  it('should render', () => {
    const [review] = reviews;
    const wrapper = mount(<Review {...review} />);
    expect(wrapper.find('[data-id="review-user"]').text()).toBe(review.user);
    expect(wrapper.find('[data-id="review-text"]').text()).toBe(review.text);
  });
});
