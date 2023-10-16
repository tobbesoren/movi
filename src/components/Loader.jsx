import "../styles/loader.css";
import React, {forwardRef, useImperativeHandle, useState} from 'react';


function Loader(props, ref) {
  const [loading, setLoading] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        const loadingCount = loading + 1;
        setLoading(loadingCount);
      },
      stop: () => {
        const loadingCount = loading > 0 ? loading - 1 : 0;
        setLoading(loadingCount);
      },
      isLoading: () => loading >= 1,
    }),
    [],
  );

  if (!loading) {
    return null;
  }

  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default forwardRef(Loader);