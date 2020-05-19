import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Header from './components/header';
import Footer from "./components/footer";
import Banner from "./components/banner";
import VacancyList from "./components/vacancy-list";
import CompanyList from "./components/company-list";
import CareerCenterList from "./components/career-center-list";
import VacancyDetails from "./containers/vacancy-details";
import CompanyDetails from "./containers/company-details";
import CareerCenterDetails from "./containers/career-center-details"
import Vacancies from "./pages/vacancies"
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
              <Route path="/" exact component={VacancyList}/>
              <Route path="/" exact component={CompanyList}/>
              <Route path="/" exact component={CareerCenterList}/>
              <Route path="/vacancy/:id" exact component={VacancyDetails}/>
              <Route path="/company/:id" exact component={CompanyDetails}/>
              <Route path="/career_center/:id" exact component={CareerCenterDetails}/>
              <Route path="/vacancies/" exact component={Vacancies}/>
            <Footer/>
          </Router>
        </div>
      </Provider>
  );
}

export default App;
