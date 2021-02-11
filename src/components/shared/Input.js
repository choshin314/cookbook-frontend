import { useState } from 'react'
import styled, {css} from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import {Button} from '../commonStyles'
import FormFeedback from './FormFeedback'

function Input(props) {
    const {
        name, 
        value,
        placeholder, 
        charLimit,
        min,
        textRows,
        autoFocus, 
        onKeyDown,
        onClick,
        type, 
        label,
        errorMsg
    } = props;

    const [charCount, setCharCount] = useState(value && value.length || 0);

    return (
        <Container>
            <Label htmlFor={name} >{label.text}</Label>
            {type === "textarea" && (
                <Textarea
                    id={name} 
                    name={name} 
                    type={type}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setCharCount(e.target.value.length);
                    }}
                    value={value}
                    rows={textRows}
                />
            )}
            {type !== "textarea" && !onClick && (
                <StyledInput 
                    id={name} 
                    name={name} 
                    type={type}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    onChange={(e) => {
                        if(type === "text") setCharCount(e.target.value.length);
                    }}
                    onKeyDown={onKeyDown}
                    min={min}
                    value={value}
                />
            )}
            {onClick && (
                <FlexRow>
                    <StyledInput 
                        id={name} 
                        name={name} 
                        type={type}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        onChange={(e) => {
                            setCharCount(e.target.value.length);
                        }}
                        onKeyDown={onKeyDown}
                        min={min}
                        value={value}
                    />
                    <AddItemBtn 
                        type="button" 
                        onClick={onClick}>
                        <FontAwesomeIcon icon={faPlus} />
                    </AddItemBtn>
                </FlexRow>
                
            )}
            <FormFeedback 
                errorMsg={errorMsg}
                charCount={charCount}
                charLimit={charLimit}
            />
        </Container>
    )
}

export default Input;


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 1rem;
`

const Label = styled.label`
    font-weight: 500;
    margin-top: .5rem;
    margin-bottom: .5rem;
    ${props => props.hidden ? css`
        position: absolute;
        width: 1px;
        height: 1px;
        top: 0;
        left: 0;
        opacity: 0;
    ` : ''}
`
const inputStyles = css`
    border: none;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.25;
    padding: .5rem;
    border-bottom: 2px solid var(--lite-med-grey);
`
const StyledInput = styled.input`
    ${inputStyles}
    flex: auto;
    &[type=number] {
        -moz-appearance: textfield;
    }
    ::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

const Textarea = styled.textarea`
    ${inputStyles}
    resize: none;
    /*-----Scrollbar-----*/
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: var(--lite-grey);
        border-radius: 5px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--teal);
        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: var(--dark-teal);
    }
`
const FlexRow = styled.div`
    width: 100%;
    display: flex;
`

const AddItemBtn = styled(Button)`
    padding: .5rem;
    align-self: flex-end;
    transform: none;
`
