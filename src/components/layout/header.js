import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Nav from './nav'
import logo from '../../assets/recipeshare-logo.png'
import logoSm from '../../assets/recipeshare-logo-abbrev.png'
import {media, Wrapper} from '../commonStyles'

export default function Header() {
    return (
        <StyledHeader>
            <Searchbar>
                <input type="text"/>
            </Searchbar>
            <Wrapper>
                <FlexRow>
                    <Logo to="/">
                        <picture>
                            <source media="(max-width: 767px)" srcSet={logoSm} />
                            <source media="(min-width: 768px)" srcSet={logo} />
                            <img src={logo} alt="RecipeShare Logo" />
                        </picture>
                    </Logo>
                    <Nav />
                </FlexRow>
            </Wrapper>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    box-shadow: 0px 4px 8px;
`

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 0;
    @media(min-width: 450px) {
        justify-content: space-between;
        padding: 0;
    }
`
const Logo = styled(Link)`
    margin: auto 0;
    text-align: center;
    flex: 0 1 200px;
    display: none;

    img {
        width: 100%;
        object-fit: cover;
    }

    @media(min-width: 450px) {
        display: inline-block;
        max-width: 80px;
    }

    @media(min-width: ${media.medium}) {
        max-width: 100%;
    }
`

const Searchbar = styled.section`
    padding: 10px 0;
    background-color: var(--teal);
    display: flex;
    justify-content: center;
    input {
        width: 90%;
        max-width: 600px;
        margin: 0 auto;
        padding: 0 1rem;
        border-radius: 50px;
        line-height: 1.5;
        font-size: 1rem;
    }

`
