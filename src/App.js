import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout'

function App() {
  return (
    <Router>
    <Layout>
      <Switch>
        <Route path="/">
          <main>Hello</main>
        </Route>
      </Switch>
    </Layout>
    </Router>
  );
}

export default App;
