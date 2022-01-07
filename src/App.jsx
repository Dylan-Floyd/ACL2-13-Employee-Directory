import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import { UserProvider } from './context/UserContext.jsx';
import Auth from './views/Auth.jsx';
import EditProfile from './views/EditProfile.jsx';
import Home from './views/Home.jsx';
import Layout from './views/Layout.jsx';
import Profile from './views/Profile.jsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <PrivateRoute path='/profile/edit'>
              <EditProfile />
            </PrivateRoute>
            <PrivateRoute path='/profile'>
              <Profile />
            </PrivateRoute>
            <Route path='/login'>
              <Auth />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
