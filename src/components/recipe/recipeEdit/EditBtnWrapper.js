import styled from 'styled-components'

export const EditBtnWrapper = styled.span`
    position: absolute;
    top: .5rem;
    right: .5rem;
    display: flex;
    align-items: start;
    color: ${p => p.light ? 'white' : 'var(--med-grey)'};
`