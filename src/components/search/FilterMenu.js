import {useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { convertToQueryString } from '../../helpers';

function FilterMenu({queries}) {
    const [activeFilter, setActiveFilter] = useState('');
    const { pathname } = useLocation();
    console.log(pathname)
    useEffect(() => {
        setActiveFilter(queries.filter)
    }, [queries])
    
    return (
        <StyledDiv>
            <h3>Filters</h3>
            <FilterDiv>
                <Link 
                    className={(pathname === '/search/all' && !activeFilter) && 'active-filter'} 
                    to={`/search/all?q=${convertToQueryString(queries.q)}`}
                >
                    All
                </Link>
                <Link 
                    className={(activeFilter === 'all' || (pathname === '/search/people' && !activeFilter)) && 'active-filter'} 
                    to={`/search/people?q=${convertToQueryString(queries.q)}&filter=all`}
                >
                    People
                </Link>
                <Link 
                    className={activeFilter === 'full' && 'active-filter'} 
                    to={`/search/people?q=${convertToQueryString(queries.q)}&filter=full`}
                >
                    Name
                </Link>
                <Link 
                    className={activeFilter === 'username' && 'active-filter'} 
                    to={`/search/people?q=${convertToQueryString(queries.q)}&filter=username`}
                >
                    Username
                </Link>
                <Link 
                    className={activeFilter === 'title' && 'active-filter'} 
                    to={`/search/recipes?q=${convertToQueryString(queries.q)}&filter=title`}
                >
                    Title
                </Link>
                <Link 
                    className={activeFilter === 'tags' && 'active-filter'} 
                    to={`/search/recipes?q=${convertToQueryString(queries.q)}&filter=tags`}
                >
                    Tags
                </Link>
            </FilterDiv>
        </StyledDiv>
    )
}

export default FilterMenu

const StyledDiv = styled.div`
    padding: .5rem 1rem;
    h3 {
        text-align: center;
        margin-bottom: .5rem;
        font-size: .75rem;
    }
`
const FilterDiv = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: .75rem;
    padding-left: 0;
    a {
        padding: .25rem .5rem;
        position: relative;
    }
    a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--accent);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform .2s ease-in;
    }
    a.active-filter {
        font-weight: 600;
    }
    a.active-filter::after {
        transform: scaleX(1);
        transform-origin: left;
    }
`