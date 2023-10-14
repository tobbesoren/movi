import React, {useRef} from 'react';
import Loader from "./Loader"

const LoaderContext = React.createContext();

export function LoaderProvider({children}) {
  const ref = useRef();
  const startLoader = () => ref.current.start();
  const stopLoader = () => ref.current.stop();
  const isLoaderActive = () => ref.current.isLoading();
  const value = React.useMemo(
    () => ({ref, startLoader, stopLoader,isLoaderActive}),
    [ref, startLoader, stopLoader,isLoaderActive]
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}
      <Loader ref={ref} />
    </LoaderContext.Provider>
  );
}

export const useLoader = () => React.useContext(LoaderContext);