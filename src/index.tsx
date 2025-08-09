import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { Provider as ReduxProvider } from "react-redux";

import App from './App';
import theme from "./styles/theme";
import GlobalStlyes from "./styles/globalStyles";
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ReduxProvider store={store}>
          <ThemeProvider theme={theme} >
              <GlobalStlyes />
              <App />
          </ThemeProvider>
      </ReduxProvider>
  </React.StrictMode>
);

