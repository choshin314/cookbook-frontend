import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout'
import Home from './pages/home'

function App() {
  return (
    <Router>
    <Layout>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
    </Router>
  );
}

export default App;
