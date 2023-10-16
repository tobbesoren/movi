import React, {useState} from 'react';

export const AppContext = React.createContext("app_context");

export function AppProvider({children}) {
    const [hiddenMenu,setHiddenMenu] = useState(false);
    return (
      <AppContext.Provider value={{hiddenMenu,setHiddenMenu}}>
        {children}
      </AppContext.Provider>
    );
  }