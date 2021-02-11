import styled from 'styled-components'

function Tag({ deletable, deleteTag, children }) {
    return (
        <TagContainer>
            {deletable && <TagBtn type="button" onClick={deleteTag}>X</TagBtn>}
            {children}
        </TagContainer>
    )
}

export default Tag

const TagContainer = styled.li`
    background-color: var(--lite-med-grey);
    padding: 5px 20px 5px 5px;
    margin-right: 10px;
    margin-bottom: 5px;
    clip-path: polygon(calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0% 100%, 0 0);
`

const TagBtn = styled.button`
    background-color: transparent;
    border: none;
    padding: 0 5px;
    margin-right: 5px;
    border-right: 1px solid var(--lite-med-grey);
    font-family: inherit;
    cursor: pointer;
`