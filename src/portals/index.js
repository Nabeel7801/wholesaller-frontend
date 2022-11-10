import React, { useState } from "react";

import { AppContext } from './context';
import { AdminApp } from './Admin'

const Portals = () => {
    const [appState, setAppState] = useState({
      ATLAS_URI: "https://wholesaller.com/api"
    })
  
    return (
        <AppContext.Provider value={{appState, setAppState}}>
            <AdminApp />
        </AppContext.Provider>
    )
  
}
 
export default Portals