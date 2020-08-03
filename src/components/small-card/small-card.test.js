import React from 'react'
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-card'
it(`renders correctly`, () => {
    const tree = renderer.create(
        <SmallMovieCard
          title="Midnight Special"
          imgUrl="img/midnight-special.jpg" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });