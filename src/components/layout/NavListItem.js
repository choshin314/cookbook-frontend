import styled from 'styled-components'

import { media } from '../commonStyles'

export const NavListItem = styled.li`
    position: relative;
    padding: 0 .5rem;
    font-size: 1.15rem;
    color: var(--teal);
    cursor: pointer;
    
    @media(min-width: 320px) {
        font-size: 1.25rem;
    }
    @media(min-width: ${media.small}) {
        font-size: 1.5rem;
        padding: 0 1rem;
    }
    a {
        color: inherit;
    }
`