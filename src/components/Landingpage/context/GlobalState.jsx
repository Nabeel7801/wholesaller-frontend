import React, { createContext, useState } from 'react';
export const GlobalState = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <GlobalState.Provider
      value={{
        modal: [showModal, setShowModal],
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};
