import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Nav from './Nav'
import logo from '../../assets/cookbook-logo.png'
import logoSm from '../../assets/cookbook-logo-abbrev.png'
import {media, Wrapper} from '../commonStyles'
import Searchbar from '../search/Searchbar'

export default function Header() {
    return (
        <StyledHeader>
            <Searchbar />
            <Wrapper>
                <FlexRow>
                    <Logo to="/">
                        <ImgWrapper>
                            <img src={logo} alt="Cookbook Logo in cursive writing" />
                        </ImgWrapper>
                        <ImgWrapperSm>
                            <img src={logoSm} alt="Abbreviated Cookbook letters 'CB' in cursive writing" />
                        </ImgWrapperSm>
                    </Logo>
                    <Nav />
                </FlexRow>
            </Wrapper>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
    box-shadow: 0px 4px 8px;
    position: relative;
    z-index: 3;
`

const FlexRow = styled.div`
    display: flex;
    justify-content: center;
    padding: .5rem 1rem;
    @media(min-width: ${media.small}) {
        justify-content: space-between;
    }
    @media(min-width: ${media.full}) {
        padding: .5rem 0;
    }
`

const Logo = styled(Link)`
    margin: auto 0;
    text-align: center;
    flex: 0 1 200px;
`
const ImgWrapper = styled.div`
    width: 162px;
    height: 40px;
    display: none;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media(min-width: ${media.medium}) {
        display: block;
    }
`

const ImgWrapperSm = styled.div`
    width: 32px;
    height: 20px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media(min-width: ${media.small}) {
        width: 64px;
        height: 40px;
    }
    @media(min-width: ${media.medium}) {
        display: none;
    }
`