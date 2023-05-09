/*
    This is just a nice custom hook that we can
    use to get all the query parameters from inside
    our components. It's a bit of a hack, but it works.
*/

import { useLocation } from 'react-router-dom';

const splitIntoPairs = (arr) => {
  const pairs = arr.reduce((accumulator, currentElement, currentIndex) => {
    if (currentIndex % 2 === 0) {
      return [...accumulator, [currentElement]];
    } else {
      const lastPair = accumulator[accumulator.length - 1];
      const allButLastPair = accumulator.slice(0, accumulator.length - 1);
      return [...allButLastPair, [...lastPair, currentElement]];
    }
  }, []);
  return pairs[0] || [];
};

const fold = (arr) => {
  const pairs = splitIntoPairs(arr);
  const object = pairs.reduce((accumulator, currentPair) => {
    return {
      ...accumulator,
      [currentPair[0]]: currentPair[1]
    };
  }, {});
  return object;
};

export const useQueryParams = () => {
    const location = useLocation();
    const currentParamsObj = new URLSearchParams(location.search);
    const params = fold([...currentParamsObj.entries()]);

    return params;
}