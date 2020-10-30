import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import HazardEditScreen from './screens/HazardEditScreen';
import HazardScreen from './screens/HazardScreen';
import {useSelector} from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

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
          <Route path="/search/:keyword" component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
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
        <Route path="/search/:keyword" component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
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
      <Footer />
      
    </Router>
  );
}

export default App;
