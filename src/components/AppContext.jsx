import React, {useState} from 'react';

export const AppContext = React.createContext("app_context");

export function AppProvider({children}) {
    const [hiddenMenu,setHiddenMenu] = useState(false);
    const [searchRequest,setSearchRequest] = useState("");
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    return (
      <AppContext.Provider value={{menu:[hiddenMenu,setHiddenMenu],api:[searchRequest,setSearchRequest], shoppingCart:[cart,setCart], total:[total,setTotal]}}>
        {children}
      </AppContext.Provider>
    );
  }