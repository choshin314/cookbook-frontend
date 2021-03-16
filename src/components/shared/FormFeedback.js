import styled from 'styled-components'

function FormFeedback({errorMsg, formErrors, charCount, charLimit}) {
    return (
        <Feedback>
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            {formErrors && <FormErrorMsgs>
                    {formErrors.map(err => <li key={err}>{err}</li>)}    
                </FormErrorMsgs>
            }
            {charLimit && !errorMsg && (
                <CharCount overLimit={charCount > charLimit}>
                    {charCount > charLimit && <span>Oh no! Too many characters!</span>}
                    <span>{charCount}/{charLimit} characters</span>
                </CharCount>
            )}
        </Feedback>
    )
}

export default FormFeedback

const Feedback = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4px;
    min-height: 12px;
`
const ErrorMsg = styled.span`
    font-size: .75rem;
    line-height: 1;
    font-weight: 500;
    color: red;
`

const FormErrorMsgs = styled.ul`
    list-style: none;
    color: red;
    padding: 1rem;
`

const CharCount = styled.div`
    display: flex;
    justify-content: flex-end;
    color: ${props => props.overLimit ? 'red' : 'inherit'};
    font-weight: ${props => props.overLimit ? '600' : 'inherit'};
    font-size: .75rem;
    span:last-child {
        margin-left: 1rem;
        flex: 0 0 115px;
        text-align: right;
    }
`