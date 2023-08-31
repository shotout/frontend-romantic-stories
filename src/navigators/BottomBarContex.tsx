import React from 'react';

const BottomBarContext = React.createContext();

export const BottomBarProvider = BottomBarContext.Provider;
export const BottomBarConsumer = BottomBarContext.Consumer;

export default BottomBarContext;