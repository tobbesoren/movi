import React, {useState} from 'react';

export const AppContext = React.createContext("app_context");

export function AppProvider({children}) {
    const [hiddenMenu,setHiddenMenu] = useState(false);
    const [searchRequest,setSearchRequest] = useState("");
    return (
      <AppContext.Provider value={{menu:[hiddenMenu,setHiddenMenu],api:[searchRequest,setSearchRequest]}}>
        {children}
      </AppContext.Provider>
    );
  }