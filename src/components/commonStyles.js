import styled, {css} from 'styled-components'

export const media = {
    small: '400px',
    medium: '768px',
    full: '1400px',
    wide: '1800px'
}

//containers, wrappers, etc

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

export const FlexRow = styled.div`
    display: flex;
    flex-direction: ${props => props.$column ? 'column' : 'row'};
`
