import React from 'react';
import renderer from 'react-test-renderer';

import Review from './review.jsx';

const mockReview = {
  author: `Kate Muir`,
  text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `December 24, 2016`,
  rating: `8,9`
};

describe(`The component is rendered correctly`, () => {
  it(`Review correctly renders with transferred mock review`, () => {
    const review = renderer
    .create(<Review
      review = {mockReview}
    />);

    expect(review).toMatchSnapshot();
  });
});
