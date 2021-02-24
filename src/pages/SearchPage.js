import SearchResultsContainer from '../components/search/SearchResultsContainer'
import { Main } from "../components/commonStyles"
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

function SearchPage() {
    const match = useRouteMatch();
    if (match.isExact) return <Redirect to="/" />
    return (
        <Main>
            <Switch>
                <Route path={`${match.path}/all`}>
                    <SearchResultsContainer category="all"/>
                </Route>
                <Route path={`${match.path}/people`}>
                    <SearchResultsContainer category="people"/>
                </Route>
                <Route path={`${match.path}/recipes`}>
                    <SearchResultsContainer category="recipes"/>
                </Route>
            </Switch>
        </Main>
    )
}

export default SearchPage