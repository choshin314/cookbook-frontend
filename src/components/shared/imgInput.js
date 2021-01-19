import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'

function ImgInput({title, file, onChange}) {
    return (
        <Container>
            <InputWrapper>
                <PreviewDiv>
                    {!file && (<UploadInstructions>
                        <h2>Select {title} Image</h2>
                        <div><FontAwesomeIcon icon={faImage} /></div>
                        <span>Drag and drop photo or click to upload</span>
                        <span>*Accepts .jpg/.jpeg/.png files less than 3MB</span>
                    </UploadInstructions>)}
                    
                    {file && <PreviewImg src={URL.createObjectURL(file)} />}
                </PreviewDiv>
                <Input 
                    id={`${title}-file-input`} 
                    type="file" 
                    name="img" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={onChange} 
                />
                <Label htmlFor={`${title}-file-input`}>
                    Select {title} image
                </Label>
            </InputWrapper>
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
    height: 100%;
    position: relative;
    flex: auto;
    display: flex;
    flex-direction: column;
`

const PreviewDiv = styled.div`
    width: 100%;
    height: 100%;
    flex: auto;
    position: relative;
    background-color: var(--lite-grey);
    border-radius: 10px;
    overflow: hidden;
`
const UploadInstructions = styled.div`
    height: 100%;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    top: 0;
    left: 0;
    object-fit: cover;
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
`