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
    max-width: ${media.medium};
    position: relative;
    padding: 1rem 0;
    @media(min-width: ${media.medium}) {
        margin: 1rem 0;
    }
`

export const PageTitle = styled.h1`
    font-size: 1.25rem;
    margin-bottom: .5rem;
    text-align: ${props => props.align ? props.align : 'center'};
    @media(min-width: ${media.medium}) {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    @media(min-width: ${media.full}) {
        font-size: 1.75rem;
        margin-bottom: 1rem;
    }
`

export const Wrapper = styled.section`
    width: 100%;
    max-width: ${media.medium};
    margin: 0 auto;
    position: relative;
`

export const GridContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(${props => props.cols ? props.cols : '1'}, minmax(10px,1fr));
    gap: ${props => props.gap ? props.gap : '1rem'};
    position: relative;
    @media(min-width: ${media.medium}) {
        ${props => props.colsMd ? css`
            grid-template-columns: repeat(${props => props.colsMd}, minmax(10px,1fr));
            ` : ''
        }
    }
    @media(min-width: ${media.full}) {
        ${props => props.colsLg ? css`
            grid-template-columns: repeat(${props => props.colsLg}, minmax(10px, 1fr));
            ` : ''
        }
    }
`

export const GridColumn = styled.div`
    justify-self: ${props => props.justify || 'stretch'};
    margin: ${props => props.margin || '0'};
    @media(min-width: ${media.medium}) {
        grid-column: span ${props => props.colsMd || '1'};
        margin: ${props => props.marginMd || props.margin || '0'};
    }
    @media(min-width: ${media.full}) {
        grid-column: span ${props => props.colsLg || props.colsMd || '1'};
        margin: ${props => props.marginLg || props.marginMd || props.margin || '0'};
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
        pointer-events: none;
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

export const Button = styled.button`
    color: white;
    background-color: var(--teal);
    border: none;
    border-radius: 5px;
    padding: .5rem 1rem;
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    :hover {
        background-color: var(--dark-teal);
    }
`

export const CancelButton = styled(Button)`
    background-color: var(--med-grey);
    &:hover {
        background-color: var(--med-dark-grey);
    }
`
export const SubmitButton = styled(Button)`
    background-color: var(--accent);
    &:hover {
        background-color: var(--accent-darkened);
    }
`

export const Form = styled.form`
    background-color: #fff;
    border-radius: 5px;
    padding: 1rem;
    flex-direction: column;
`
export const StyledOL = styled.ol`
    list-style: none;
    border-top: 2px solid rgba(0,0,0,.3);
    background-color: white;
    overflow: auto;
`

export const PopInStyles = css`
    &.pop-in-enter, &.pop-in-appear {
        transform: scale(1.15) translate(-50%, -50%);
        transform-origin: 0 0;
        opacity: 0;
    }
    &.pop-in-enter-active, &.pop-in-appear-active {
        transform: scale(1) translate(-50%, -50%);
        transform-origin: 0 0;
        opacity: 1;
        transition: transform .2s ease-in, opacity .2s ease-in;
    }
    &.pop-in-exit {
        opacity: 1;
        transform: scale(1) translate(-50%, -50%);
        transform-origin: 0 0;
    }
    &.pop-in-exit-active {
        transform: scale(1.15) translate(-50%, -50%);
        opacity: 0;
        transition: transform .2s ease-in, opacity .2s ease-in;
    }
`
