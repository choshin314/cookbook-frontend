import styled, {css} from 'styled-components'

export const media = {
    small: '400px',
    medium: '768px',
    full: '1400px',
    wide: '1800px'
}

//containers, wrappers, etc

export const Main = styled.main`
    padding: 3rem 0;
`

export const Wrapper = styled.section`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
    @media(min-width: ${media.medium}) {
        padding-left: 3rem;
        padding-right: 3rem;
    }
`

export const GridContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    @media(min-width: ${media.medium}) {
        gap: 1.5rem;
        grid-template-columns: 1fr 1fr;
    }
    @media(min-width: ${media.full}) {
        gap: 2rem;
        grid-template-columns: 1fr 1fr 1fr;
    }
`