import styled from 'styled-components'

function FormFeedback({errorMsg, charCount, charLimit}) {
    return (
        <Feedback>
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
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
    margin-top: 5px;
    min-height: 19px;
`
const ErrorMsg = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: red;
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