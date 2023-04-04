import React from 'react';

/**
 * Because we have the user compose the carousel with the <CarouselItem />
 * component and we don't want them to have to pass the width of the carousel to
 * each item, we're using a context value to pass it down without prop drilling
 * or extra user-land props.
 */
export const CarouselWidthContext = React.createContext(0);
