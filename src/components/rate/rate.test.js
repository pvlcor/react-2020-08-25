import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rate from './rate';

Enzyme.configure({ adapter: new Adapter() });

describe('Rate', () => {
  it('should render', () => {
    const wrapper = shallow(<Rate value={4} />);
    expect(wrapper).toMatchSnapshot();
  });
});
