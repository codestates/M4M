import { css } from 'styled-components';

const sizes = {
  tabletMini: 480,
  tablet: 768,
  laptop: 1024
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const pixSize = sizes[label];
  accumulator[label] = (...args) => css`
    @media (min-width: ${pixSize}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
