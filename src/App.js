import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import ScrollToTop from './components/shared/ScrollToTop'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import RecipePage from './pages/RecipePage'
import RecipeCreatePage from './pages/RecipeCreatePage'
import AccountPage from './pages/AccountPage';
import ProtectedRoute from './components/shared/ProtectedRoute'
import { RecipeViewProvider } from './context/recipeViewContext';
import SearchPage from './pages/SearchPage';
import Flash from './components/shared/Flash';

function App({user, redirect}) {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        {redirect.to && <Redirect to={redirect.to} />}
        <Flash />
        <Switch>
          <Route exact path="/">
            {user && <Redirect to="/feeds/home" />}
            {!user && <Redirect to="/feeds/top" />}
          </Route>
          <Route path="/feeds">
            <Home />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
          <ProtectedRoute path="/profile/me" 
            render={(user) => <Redirect to={`/profile/view/${user.username}`} />}
          />
          <Route path="/profile/view/:username">
            <ProfilePage />
          </Route>
          <Route path="/recipes/view/:id-:slug" >
            <RecipeViewProvider><RecipePage /></RecipeViewProvider>
          </Route>
          <ProtectedRoute path="/recipes/create">
            <RecipeCreatePage />
          </ProtectedRoute>
        </Switch>
      </Layout>
    </Router>
  );
}

const mapStateToProps = global => ({ user: global.auth.user, redirect: global.redirect })
export default connect(mapStateToProps)(App);
