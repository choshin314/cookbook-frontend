import styled, {css} from 'styled-components'

export const media = {
    small: '400px',
    medium: '768px',
    full: '1400px',
    wide: '1800px'
}

//containers, wrappers, etc

export const Main = styled.main`
    width: 100%;
    max-width: 768px;
    margin: .5rem 0;
    @media(min-width: ${media.medium}) {
        margin: 1rem 0;
    }
`

export const PageTitle = styled.h1`
    font-size: 1.5rem;
    margin-bottom: .5rem;
    text-align: ${props => props.align ? props.align : 'center'};
    @media(min-width: ${media.medium}) {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    @media(min-width: ${media.full}) {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
`

export const Wrapper = styled.section`
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
`

export const GridContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(${props => props.cols ? props.cols : '1'}, 1fr);
    gap: ${props => props.gap ? props.gap : '1rem'};
    @media(min-width: ${media.medium}) {
        ${props => props.colsMd ? css`
            grid-template-columns: repeat(${props => props.colsMd}, 1fr);
            ` : ''
        }
    }
    @media(min-width: ${media.full}) {
        ${props => props.colsLg ? css`
            grid-template-columns: repeat(${props => props.colsLg}, 1fr);
            ` : ''
        }
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
    .fadeExpand-appear {
        opacity: 0;
    }
    .fadeExpand-appear-active {
        opacity: 1;
        transition: opacity .3s ease-out;
    }
    .fadeExpand-enter {
        opacity: 0;
    }
    .fadeExpand-enter-active {
        opacity: 1;
        transition: opacity .3s ease-out;
    }
    .fadeExpand-exit {
        opacity: 1;
    }
    .fadeExpand-exit-active {
        opacity: 0;
        transition: opacity .3s ease-out;
    }
`