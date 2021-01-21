import {useState} from 'react'
import styled, {css} from 'styled-components'

import FormFeedback from './formFeedback'

function Input(props) {
    const {
        id, 
        name, 
        placeholder, 
        charLimit,
        min,
        textRows,
        autoFocus, 
        onChange,
        value, 
        type, 
        label,
        errorMsg
    } = props;

    const [charCount, setCharCount] = useState(0);

    return (
        <Container>
            <Label htmlFor={id} hidden={label.hide}>{label.text}</Label>
            {type !== "textarea" && (
                <StyledInput 
                    id={id} 
                    name={name} 
                    type={type}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setCharCount(e.target.value.length);
                        onChange && onChange(e)
                    }}
                    min={min}
                    value={value}
                />
            )}
            {type === "textarea" && (
                <Textarea
                    id={id} 
                    name={name} 
                    type={type}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setCharCount(e.target.value.length);
                        onChange(e)
                    }}
                    value={value}
                    rows={textRows}
                />
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