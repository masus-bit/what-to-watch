import React from "react";
import Reviews from "../tabs/reviews.jsx";

const TabContent = (props) => {
  const { tab, film, comments } = props;
  const components = {
    reviews: Reviews,
  };
  const Component = components[tab] || `overview`;

  return <Component film={film} comments={comments} />;
};

export default TabContent;
