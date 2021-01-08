import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout'
import {Main, GridContainer, Wrapper} from './components/commonStyles'

function App() {
  return (
    <Router>
    <Layout>
      <Switch>
        <Route path="/">
          <Main>
            <Wrapper>
            <GridContainer>
              <article>Hello</article>
              <article>Hello</article>
              <article>Hello</article>
              <article>Hello</article>
              <article>Hello</article>
              <article>Hello</article>
              <article>Hello</article>
            </GridContainer>
            </Wrapper>
          </Main>
        </Route>
      </Switch>
    </Layout>
    </Router>
  );
}

export default App;
