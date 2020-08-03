import React, { PureComponent } from "react";

const Tabs = (props) => {
  const { activeItem, onTabChange } = props;

  const tabs = [
    { name: `overview`, link: `#overview` },
    { name: `reviews`, link: `#reviews` },
  ];

  const handleTabChange = (evt) => {
    const tabName = evt.target.dataset.tabName;
    onTabChange(tabName);
  };

  const capitalizeTabName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <ul className="movie-nav__list">
      {tabs.map(({ name, link }) => (
        <li
          key={name}
          onClick={handleTabChange}
          className={`movie-nav__item ${
            name === activeItem && `movie-nav__item--active`
          }`}
        >
          <a
            className="movie-nav__link"
            data-tab-name={name}
            onClick={handleTabChange}
          >
            {capitalizeTabName(name)}
          </a>
        </li>
      ))}
    </ul>
  );
};
export default Tabs;
