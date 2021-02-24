import { useState} from 'react'
import styled from 'styled-components'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { convertToQueryString } from "../../helpers";

function Searchbar() {
    const history = useHistory();
    const [ searchQuery, setSearchQuery ] = useState('')
    function handleChange(e) {
        setSearchQuery(e.target.value)
    }
    function handleSearch(e) {
        e.preventDefault();
        history.push(`/search/all?q=${convertToQueryString(searchQuery)}`)
    }
    return (
        <StyledSection>
            <StyledInputWrapper onSubmit={handleSearch}>
                <StyledInput 
                    placeholder="Search for people or recipes"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <StyledBtn type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </StyledBtn>
            </StyledInputWrapper>
        </StyledSection>
    )
}

export default Searchbar

const StyledSection = styled.section`
    padding: 10px 0;
    background-color: var(--teal);
`
const StyledInputWrapper = styled.form`
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
`
const StyledInput = styled.input`
    border-radius: 50px;
    padding: .25rem .75rem;
    width: 100%;
    line-height: 1.5;
    font-size: .75rem;
`

const StyledBtn = styled.button`
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    border: none;
    color: var(--teal);
    font-weight: 600;
`