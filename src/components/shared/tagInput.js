import {useState} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import FormFeedback from './formFeedback'
import {Button} from '../commonStyles'

const KEYS = [",", "Enter"];

function TagInput({ tags, setTags }) {
    const [ inputState, setInputState ] = useState({
        value: "",
        error: null
    });

    function handleChange(e) {
        setInputState(prev => ( {...prev, value: e.target.value }))
    }

    function removeTag(tagToRemove) {
        setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }

    function addTag(e) {
        e.preventDefault();
        setInputState(prev => ({ ...prev, error: null }))

        const tagExists = tags.includes(inputState.value);
        const tagText = inputState.value.toLowerCase().trim();
        const tagLength = tagText.length;
        
        if (!tagExists && tagLength >= 4 && tagLength <= 16) {
            setTags(prev => prev.concat(tagText));
            setInputState(prev => ( { ...prev, value: '' } ));
        } else if (tagLength < 4 || tagLength > 16) {
            setInputState(prev => ( { ...prev, error: 'Tags must be between 4 to 16 characters'} ));
        } else if (tagExists) {
            setInputState(prev => ( { value: '', error: 'That tag has already been added'}));
        }
    }

    return (
        <Container>
            <Label htmlFor={"tags"} >Add Tags</Label>
            <InputWrapper>
                <Input 
                    id="tags"
                    name="tags"
                    type="text" 
                    placeholder="e.g. keto, vegetarian, Korean, Mexican" 
                    value={inputState.value}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (!KEYS.includes(e.key)) return;
                        addTag(e);
                    }}
                />
                <AddTagBtn onClick={addTag} title="Add tag">
                    <FontAwesomeIcon icon={faPlus} />
                </AddTagBtn>
            </InputWrapper>
            <FormFeedback errorMsg={inputState.error} />
            <TagContainer>
                <Tags>
                    {tags.map(tag => (
                        <Tag key={tag}>
                            <button onClick={() => removeTag(tag)}>X</button>
                            {tag}
                        </Tag>
                    ))}
                </Tags>
            </TagContainer>
        </Container>
    )
}

export default TagInput;

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
const AddTagBtn = styled(Button)`
    padding: .5rem;
    position: absolute;
    right: 0;
    top: 50%;
`

const TagContainer = styled.div`

`
const Tags = styled.ol`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
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
