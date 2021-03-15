import { connect } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import styled from 'styled-components'
import { getSearchResults } from "../../redux/actions/searchActions"
import { Button } from "../commonStyles";

function SeeMoreBtn({category, query, filter, dispatchGetSearchResults}) {
    const { pathname } = useLocation();
    const history = useHistory();
    return (
        <StyledButton 
            type="button" 
            onClick={() => {
                if (pathname === '/search/all') {
                    history.push(`/search/${category === 'users' ? 'people' : 'recipes'}?q=${query}&filter=${filter ? filter : ''}`)
                } else {
                    dispatchGetSearchResults(category, query, filter)
                }
            }}
        >
            See more
        </StyledButton>
    )
}
const mapDispatch = { dispatchGetSearchResults: getSearchResults }
export default connect(null, mapDispatch)(SeeMoreBtn)

const StyledButton = styled(Button)`
    align-self: center;
    margin-top: 1rem;
`