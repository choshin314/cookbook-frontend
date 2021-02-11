import styled from 'styled-components'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faGripHorizontal as faGrip} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {Button} from '../commonStyles'

function ListItemDraggable(props) {
    const { provided, itemId, content, onDelete } = props;
    return (
        <ListItem 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            <ItemBtn type="button" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </ItemBtn>
            <ListItemContent>{content}</ListItemContent>
            <ItemBtn type="button" title="drag to reorder" as="span" {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faGrip} />
            </ItemBtn>
        </ListItem>
    )
}

export default ListItemDraggable

const ListItem = styled.li`
    padding: .5rem 1rem;
    border: rgba(0,0,0,.1) 2px solid;
    border-radius: 5px;
    background-color: var(--lite-grey);
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    overflow-wrap: break-word;
`
const ListItemContent = styled.div`
    flex: auto;
    padding: .5rem 1rem;
    text-align: ${props => props.textalign || 'center'};
    line-height: 1.25;
    overflow-wrap: break-word;
    max-width: calc(100% - 128px);
`
const ItemBtn = styled(Button)`
    transform: none;
    border: none;
    width: 46px;
    :focus, :hover {
        background-color: var(--accent);
    }
    :disabled {
        background-color: var(--dark-teal);
    }
    &.margin-right {
        margin-right: 5px;
    }
`