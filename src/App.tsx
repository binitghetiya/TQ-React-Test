import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import axios from 'axios';

import Routes from './routes/Routes';
import Navigation from './views/navigation/Navigation';

import './css/main.scss';

axios.defaults.baseURL = 'https://tqinterviewapi.azurewebsites.net/api';
const history = createBrowserHistory();

const getApiKey = async () => {
  try {
    return await axios.get('/Companies/key');
  } catch (err) {
    return err;
  }
};

const App: React.FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);

  useEffect(() => {
    let authKey = localStorage.getItem('authKey') || '';
    if (!authKey) {
      getApiKey()
        .then(({ data }) => {
          localStorage.setItem('authKey', data);
        })
        .catch((err) => err && setError(true));
    }
  }, []);

  return (
    <Router history={history}>
      <Navigation />
      <Routes />
    </Router>
  );
};

export default App;
