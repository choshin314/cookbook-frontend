import styled from 'styled-components'
import {Draggable, Droppable} from 'react-beautiful-dnd'

import {media} from '../commonStyles'
import ListItemDraggable from './ListItemDraggable'
import FormFeedback from './FormFeedback'

function ListDraggable(props) {
    const { 
        direction,
        handleDelete, 
        listErrorMsg, 
        list, 
        listName, 
        listNoDrag, 
        displayContent, 
        children 
    } = props;

    if (list) return (
        <Container>
            <InputWrapper>{children}</InputWrapper>
            <Droppable 
                droppableId={listName}
                renderClone={(provided, snapshot, rubric) => {
                    const dragging = list[rubric.source.index];
                    return (
                        <ListItemDraggable 
                            provided={provided}
                            itemId={dragging.id}
                            content={displayContent(dragging)}
                            onDelete={() => handleDelete(dragging.id)}
                        />
                    )
                }}   
            >
                {provided => (
                    <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
                        <List>
                            {list && list.length > 0 && list.map((item, i) => (
                                <Draggable draggableId={item.id} index={i} key={item.id} >
                                    {(provided) => (
                                        <ListItemDraggable
                                            provided={provided}
                                            itemId={item.id}
                                            content={displayContent(item)}
                                            onDelete={() => handleDelete(item.id)}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    </ListContainer>
                )}
            </Droppable>
            <FormFeedback errorMsg={listErrorMsg} />
        </Container>
    )

    if (listNoDrag) return (
        <Container>
            <InputWrapper>{children}</InputWrapper>
            <ListContainer>
                <List direction={direction}>
                    {listNoDrag}
                </List>
            </ListContainer>
            <FormFeedback errorMsg={listErrorMsg} />
        </Container>
    )
}

export default ListDraggable;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 2rem;
    height: 100%;
`

const Label = styled.label`
    font-weight: 500;
    margin-top: .5rem;
    margin-bottom: .5rem;
`
const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
`

const ListContainer = styled.div`
    min-height: 100px;
    height: 100%;
    width: 100%;
    background-color: rgba(247, 248, 248, .3);
    border-radius: 5px;
    overflow-y: auto;
    @media(min-width: ${media.medium}) {
        min-height: 200px;
    }
`
const List = styled.ol`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => props.direction || 'column'};
`

