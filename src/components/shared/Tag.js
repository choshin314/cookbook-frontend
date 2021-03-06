import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Tag({ deletable, deleteTag, children }) {
    return (
        <TagContainer deletable={deletable}>
            {deletable && <TagBtn type="button" onClick={deleteTag}>X</TagBtn>}
            <TagContent to={`/search/recipes?q=${children}&filter=tags`}>{children}</TagContent>
        </TagContainer>
    )
}

export default Tag

const TagContainer = styled.li`
    background-color: var(--lite-med-grey);
    padding: ${({deletable}) => deletable ? '5px 20px 5px 5px' : '5px 20px'};
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

const TagContent = styled(Link)`
    cursor: pointer;
    color: inherit;
`