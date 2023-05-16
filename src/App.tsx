import React from 'react';
import {CurrencyConvector} from "./components/CurrencyConvector";
import styles from "./App.module.scss"
function App() {
  return (
      <div className={styles.main}>
        <CurrencyConvector/>
      </div>

  );
}

export default App;
