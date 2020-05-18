import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Header from './components/header';
import Footer from "./components/footer";
import Banner from "./components/banner";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store'
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './store/actions/types';

if (localStorage.getItem('tokens'))
{
    const accessToken = JSON.parse(localStorage.getItem('tokens')).access;
    const payload = jwt_decode(accessToken);

    store.dispatch({
        type: SET_CURRENT_USER,
        payload : payload.user_id
    });
}

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Header/>
              <Route path="/" exact component={Banner}/>
            <Footer/>
          </Router>
        </div>
      </Provider>
  );
}

export default App;
