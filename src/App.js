import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout'
import Home from './pages/home'
import ProfilePage from './pages/profilePage'
import RecipePage from './pages/recipePage'
import RecipeCreatePage from './pages/recipeCreatePage'

function App() {
  return (
    <Router>
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
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
      </Switch>
    </Layout>
    </Router>
  );
}

export default App;
