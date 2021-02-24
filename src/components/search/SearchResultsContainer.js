import styled from 'styled-components'
import {useEffect, useState} from 'react'
import queryString from 'query-string'
import { useLocation } from "react-router-dom"

import useAjax from '../../hooks/ajax'
import { convertToQueryString } from '../../helpers'
import SearchResults from './SearchResults'
import FilterMenu from './FilterMenu'

function SearchResultsContainer({ category }) {
    const { search, pathname } = useLocation();
    const queries = queryString.parse(search);
    const { get : getUsers } = useAjax()
    const { get: getRecipes } = useAjax()
    const [ users, setUsers ] = useState([])
    const [ recipes, setRecipes ] = useState([])

    useEffect(() => {
        async function getStuff() {
            if (category === 'all') {
                const users = await getUsers(`/users?q=${convertToQueryString(queries.q)}`)
                if (users.data) setUsers(users.data)
                const recipes = await getRecipes(`/recipes?q=${convertToQueryString(queries.q)}`)
                if (recipes.data) setRecipes(recipes.data)
            }
            if (category === 'people') {
                const users = await getUsers(`/users?q=${convertToQueryString(queries.q)}&filter=${queries.filter}`)
                if (users.data) setUsers(users.data)
            }
            if (category === 'recipes') {
                const recipes = await getRecipes(`/recipes?q=${convertToQueryString(queries.q)}&filter=${queries.filter}`)
                if (recipes.data) setRecipes(recipes.data)
            }
        }
        getStuff();
    }, [category, search])

    return (
        <Container>
            <FilterMenu queries={queries} />
            <SearchResults category={category} users={users} recipes={recipes} />
        </Container>
    )
}

export default SearchResultsContainer

const Container = styled.div`
    background-color: var(--lite-grey);
    padding: 1rem;
    height: 100%;
    border-radius: 5px;
`
