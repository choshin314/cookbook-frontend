import {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

import {media} from '../commonStyles'
import FormFeedback from './formFeedback'

function ListInputWrapper(props) {
    const { 
        droppableId,
        droppableDirection,
        direction,
        listErrorMsg,
        children,
    } = props;

    return (
        <Container>
            <InputWrapper>
                {/* first child is the INPUT (regular Input component for instructions 
                    and Tags, IngredientFieldset for ingredients) */}
                {children[0]} 
            </InputWrapper>
            <Droppable droppableId={droppableId} direction={droppableDirection}>
                {(provided) => (
                    <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
                        <List direction={direction}>
                            {children[1]}
                            {provided.placeholder}
                        </List>
                    </ListContainer>
                )}
            </Droppable>
            <FormFeedback 
                errorMsg={listErrorMsg}
            />
        </Container>
    )
}

export default ListInputWrapper;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 2rem;
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
    background-color: rgba(247, 248, 248, .3);
    border-radius: 5px;
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
    flex-direction: ${props => props.direction};
`

