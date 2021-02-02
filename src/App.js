import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import ScrollToTop from './components/shared/ScrollToTop'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import RecipePage from './pages/RecipePage'
import RecipeCreatePage from './pages/RecipeCreatePage'
import RecipeUpdatePage from './pages/RecipeUpdatePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/shared/ProtectedRoute'

function App({user, redirect}) {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        {redirect.to && <Redirect to={redirect.to} />}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="/account/register">
            <RegisterPage />
          </Route>
          <Route path="/account/login">
            <LoginPage />
          </Route> */}
          <Route path="/account">
            <AuthPage />
          </Route>
          <Route path="/profile/me">
            {user && <Redirect to={`/profile/view/${user.username}`} />}
            {!user && <Redirect to="/account/login" />}
          </Route>
          <Route path="/profile/view/:username">
            <ProfilePage />
          </Route>
          <ProtectedRoute path="/profile/viewprotected/:username">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/recipes/view/:id">
            <RecipePage />
          </Route>
          <Route path="/recipes/create">
            <RecipeCreatePage />
          </Route>
          <Route path="/recipes/update/:id">
            <RecipeUpdatePage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

const mapStateToProps = global => ({ user: global.auth.user, redirect: global.redirect })
export default connect(mapStateToProps)(App);
