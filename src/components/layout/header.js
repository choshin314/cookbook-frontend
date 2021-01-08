import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Nav from './nav'
import logo from '../../assets/recipeshare-logo.png'
import logoSm from '../../assets/recipeshare-logo-abbrev.png'
import {media, Wrapper, FlexRow} from '../commonStyles'

export default function Header() {
    console.log(logo)
    return (
        <StyledHeader>
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
                    <AuthBtn aria-label="Sign Out">
                        <FontAwesomeIcon icon={faSignOutAlt} title="Sign Out" />
                    </AuthBtn>
                </FlexRow>
            </Wrapper>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    display: flex;
    box-shadow: 0px 4px 8px;
    @media(min-width: ${media.medium}) {

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

const Searchbar = styled.input`
    border-radius: 50px;
    line-height: 1.5;
    font-size: 1.5rem;
    width: 200px;
`
const AuthBtn = styled.button`
    padding: 1rem;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: var(--teal);
    
`