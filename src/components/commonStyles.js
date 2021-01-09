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

export const CardWrapper = styled.article`
    border-radius: 5px;
    position: relative;

    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        opacity: 0;
        transition: opacity .3s cubic-bezier(.25,.8,.25,1);
    }
    &:hover::before {
        opacity: 1;
    }
`