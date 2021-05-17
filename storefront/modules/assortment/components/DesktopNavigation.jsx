// TODO: Fix a11y stuff
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

import DesktopNavigationContext from './DesktopNavigationContext';
import MegaDropdown from './MegaDropdown';
import useAssortmentsLinks from '../hooks/useAssortmentsLinks';
import getCatagoriesHierarchies from '../utils/getCatagoriesHierarchies';

const DesktopNavigation = () => {
  const router = useRouter();
  const [hoverPath, setHoverPath] = useState([]);
  const [isTouching, setTouching] = useState(false);
  const navigatedPath = router.asPath.split('/').filter(Boolean);

  const { assortments } = useAssortmentsLinks();

  const routes = getCatagoriesHierarchies(assortments);

  const handleClick = () => () => {
    setHoverPath([]);
  };

  const handleTouchStart = () => {
    setTouching(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setTouching(false), 300);
  };

  return (
    <DesktopNavigationContext.Provider
      value={{
        setHoverPath,
        navigatedPath,
        hoverPath,
        isTouching,
      }}
    >
      <nav
        className="nav nav--main"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div key="shop" className="d-inline-block font-size-0">
          <Link href="/shop">
            <a
              className="nav--main__item"
              data-in-navigation-path={navigatedPath.includes('/shop')}
              data-in-hover-path={hoverPath.includes('/shop')}
              onMouseEnter={() => {
                if (!isTouching) {
                  setHoverPath('/shop');
                }
              }}
              onMouseOut={() => {
                setHoverPath([]);
              }}
              onBlur={() => {
                if (!isTouching) setHoverPath([]);
              }}
              onClick={handleClick()}
            >
              shop
            </a>
          </Link>
          {hoverPath.includes('/shop') &&
            routes.map(({ ...rest }) => <MegaDropdown {...rest} />)}
        </div>
      </nav>
    </DesktopNavigationContext.Provider>
  );
};

export default DesktopNavigation;
