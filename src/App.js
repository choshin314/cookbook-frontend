import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout'
import Home from './pages/home'
import RecipePage from './pages/recipePage'

function App() {
  return (
    <Router>
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/recipes/:id">
          <RecipePage />
        </Route>
      </Switch>
    </Layout>
    </Router>
  );
}

export default App;
