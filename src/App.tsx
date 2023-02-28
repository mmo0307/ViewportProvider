import React from 'react';
import useViewport from "./ViewportProvider";
import './App.css';

function App() {
  const { lessThan, greaterThan, betweenBreakpoints } = useViewport();
  return (
      <div className="wrapper">
        {lessThan('sm') && <p>Less than SM</p>}
        {greaterThan('lg') && <p>Greater than LG</p>}
        {betweenBreakpoints('xs', 'xxl') && <p>Between XS and XXL</p>}
      </div>
  );
}

export default App;
