import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { store } from './store';
import ProtectedRoute from './Components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));

  

root.render(
  
  <Provider store={store}>
    <BrowserRouter  >
      <Toaster />
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    </BrowserRouter>
  </Provider>
);


