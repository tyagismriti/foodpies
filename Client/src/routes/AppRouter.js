import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect  } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

import Navbar from '../Components/NavBar/Navbar';
import Home from '../Components/Home/Home';
import Recipes from '../Components/Recipes/Recipes';
import Shop from '../Components/Shop/Shop';
import Login from '../Components/LoginSignup/Login';
import Signup from '../Components/LoginSignup/Signup';
import Featured from '../Components/Featured/Featured';
import Pizza from '../Components/Recipes/Post/Pizza';
import Post from '../Components/Recipes/Post/Post';

const AppRouter = () => {

    const [active, setActive] = useState('');
    const { user } = useAuthContext()
  
    useEffect(() => {
      let CurrentURL = window.location.href;

      if (CurrentURL.endsWith('/'))
        setActive('home')
      else if (CurrentURL.endsWith('/shop'))
        setActive('shop')
      else if (CurrentURL.endsWith('/recipes'))
        setActive('recipes')
      else if (CurrentURL.endsWith('/featured'))
        setActive('featured')
      else if (CurrentURL.endsWith('/hotline'))
        setActive('hotline')
      else if (CurrentURL.endsWith('/login'))
        setActive('login')
      else if (CurrentURL.endsWith('/signup'))
        setActive('signup')
      else {
        <Router > <Redirect to="/error" /> </Router >
        setActive('404: Page not Found...')
      }
    }, [active])

    return (
        <Router>
        <Navbar active={active} setActive={setActive} />
        <Switch>
          <Route path='/' exact>
            <Home setActive={setActive} />
          </Route>
          <Route path='/recipes' exact component={Recipes} />
          <Route 
            path='/recipes/:recipeName'
            render={(props) => user ? <Post {...props} />: <Redirect to={{ pathname: '/login', state: { redirectTo: props.location }}} />}
          />

          <Route path='/shop' component={Shop} />
          <Route path='/featured' exact component={Featured} />
          <Route path='/hotline' exact>
            {user ? <Pizza />: <Redirect to={{ pathname: '/login', state: { redirectTo: '/hotline' }}} /> }
          </Route>
          <Route path='/login' exact>
            <Login setActive={setActive} />  
          </Route>
          <Route path='/signup' exact>
            {!user ? <Signup setActive={setActive} /> : <Redirect to="/" /> }
          </Route>

          <Route path='/error'>
            <h1>404🤦‍♂️🤷‍♀️</h1>
          </Route>
        </Switch>
      </Router>
    )
}

export default AppRouter;