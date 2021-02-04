import styled, {css} from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import FormFeedback from './FormFeedback'

function ImgInput({name, label, file, errorMsg, imgSize="1MB", previewSize="400px", circle }) {

    return (
        <Container>
            <InputWrapper previewSize={previewSize}>
                <PreviewDiv circle={circle}>
                    {!file && (<UploadInstructions>
                        <h2>Select {label.text}</h2>
                        <div><FontAwesomeIcon icon={faImage} /></div>
                        <span>Drag and drop photo or click to upload</span>
                        <span>*Accepts .jpg/.jpeg/.png, max size {imgSize}</span>
                    </UploadInstructions>)}
                    
                    {file && <PreviewImg src={URL.createObjectURL(file)} />}
                </PreviewDiv>
                <Input 
                    id={name} 
                    type="file" 
                    name={name} 
                    accept="image/png, image/jpeg, image/jpg"
                />
                <Label htmlFor={name} hidden={label.hide}>
                    Select {label.text}
                </Label>
            </InputWrapper>
            <FormFeedback errorMsg={errorMsg} />
        </Container>
    )
}

export default ImgInput;

const Container = styled.div`
    height: 100%;
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;
`

const InputWrapper = styled.div`
    width: 100%;
    max-width: ${p => p.previewSize};
    height: 100%;
    position: relative;
    flex: auto;
    display: flex;
    flex-direction: column;
`

const PreviewDiv = styled.div`
    --radius: ${p => p.circle ? '50%' : '10px'};
    width: 100%;
    padding-top: 100%;
    height: 0px;
    flex: auto;
    position: relative;
    background-color: var(--lite-grey);
    border-radius: var(--radius);
    overflow: hidden;
`
const UploadInstructions = styled.div`
    position: absolute;
    width: calc(100% - 40px);
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    padding: 2rem 1rem;
    border: dashed 2px var(--med-grey);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--med-grey);
    h2 {
        font-size: 1.25rem;
        text-transform: capitalize;
    }
    div {
        font-size: 3rem;
    }
    span {
        font-size: .75rem;
    }
`
const PreviewImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    border: var(--accent) solid 4px;
    border-radius: var(--radius);
`

const Input = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`

const Label = styled.label`
    align-self: center;
    background-color: var(--teal);
    color: #fff;
    font-weight: 500;
    width: 100%;
    max-width: 500px;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 30px;;
    text-transform: capitalize;
    cursor: pointer;
    position: relative;
    :hover {
        background-color: var(--dark-teal);
    }
    ${p => p.hide ? css`
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
    ` : ''}                                
`