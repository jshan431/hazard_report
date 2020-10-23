import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import HazardEditScreen from './screens/HazardEditScreen';
import HazardScreen from './screens/HazardScreen';
import {useSelector} from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';

function App() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let routes;

  if(userInfo) {
    routes = (
      <Container>
        <Switch>
          <Route path="/hazard/:id/edit" component={HazardEditScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/hazard/:id' component={HazardScreen} exact/>
          <Route path='/profile' component={ProfileScreen} />
          <Redirect to="/" />
        </Switch>
      </Container>
    );
  } else {
    routes = (
      <Container>
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/hazard/:id' component={HazardScreen} exact/>
        <Redirect to="/" />
      </Container>
    )
  }

  return (
    <Router>
      <Header />
      <main className="py-3">
        {routes}
      </main>

      
    </Router>
  );
}

export default App;
