import {useState} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import FormFeedback from './formFeedback'
import {Button} from '../commonStyles'

const KEYS = [",", "Enter"];

function ListInput(props) {
    const { 
        name,
        value,
        errorMsg,
        label,
        placeholder,
        listItems,
        direction,
        children,
        onChange,
        addToList,
        keyDownTrigger
    } = props;

    return (
        <Container>
            <Label htmlFor={name} >{label}</Label>
            <InputWrapper>
                <Input 
                    id={name}
                    name={name}
                    type="text" 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                    onKeyDown={e => {
                        if (e.key !== keyDownTrigger) return;
                        addToList(e, value)
                    }}
                />
                <AddBtn onClick={(e) => addToList(e, value)} title={`Add ${label}`}>
                    <FontAwesomeIcon icon={faPlus} />
                </AddBtn>
            </InputWrapper>
            <FormFeedback errorMsg={errorMsg} />
            <TagContainer>
                <Tags direction={direction}>
                    {children}
                </Tags>
            </TagContainer>
        </Container>
    )
}

export default ListInput;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 1rem;
`

const Label = styled.label`
    font-weight: 500;
    margin-top: .5rem;
    margin-bottom: .5rem;
`
const InputWrapper = styled.div`
    position: relative;
`
const Input = styled.input`
    border: none;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.25;
    padding: .5rem;
    border-bottom: 2px solid var(--lite-med-grey);
`
const AddBtn = styled(Button)`
    padding: .5rem;
    position: absolute;
    right: 0;
    top: 50%;
`

const TagContainer = styled.div`
    min-height: 50px;
`
const Tags = styled.ol`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => props.direction};
`

const Tag = styled.li`
    background-color: var(--lite-med-grey);
    padding: 5px 20px 5px 5px;
    margin-right: 10px;
    margin-bottom: 5px;
    clip-path: polygon(calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0% 100%, 0 0);
    button {
        background-color: transparent;
        border: none;
        padding: 0 5px;
        margin-right: 5px;
        border-right: 1px solid var(--lite-med-grey);
        font-family: inherit;
        cursor: pointer;
    }
`
