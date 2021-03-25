import React, {useEffect} from 'react';
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';

import AppHeader from './Main/Header/Header'
import Home from './Main/Home/Home'
import AppLogin from './Main/Login/Login'
import Eventlist from './Components/Event-list/EventList'
import Dictionary from './Components/Dictionary/Dictionary'

import {useDispatch, useSelector} from 'react-redux';
import {auth} from "../Actions/user"

function App() {
  const isAuth = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(auth())
  }, [dispatch])


  return (
    <Router>
      <AppHeader/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path="/event-list" component={Eventlist}   /> 
        {  isAuth.currentUser.isAdmin && <Route path="/dictionary" component={Dictionary} /> } 
        { !isAuth.isAuth && <Route path="/account" component={AppLogin}      /> }
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
export default App;
