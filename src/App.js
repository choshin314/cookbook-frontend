import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/shared/ScrollToTop'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import RecipePage from './pages/RecipePage'
import RecipeCreatePage from './pages/RecipeCreatePage'
import RecipeUpdatePage from './pages/RecipeUpdatePage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <AuthPage />
          </Route>
          <Route path="/login">
            <AuthPage />
          </Route>
          <Route path="/profile/:username">
            <ProfilePage />
          </Route>
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

export default App;
