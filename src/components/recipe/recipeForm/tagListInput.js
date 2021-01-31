import { useState, useContext } from 'react'
import styled from 'styled-components'

import ListInputWrapper from '../../shared/ListInputWrapper'
import Input from '../../shared/Input'
import { RecipeFormContext } from './RecipeForm'

const KEYS = [",", "Enter"];

function TagListInput() {
    const [ draftError, setDraftError ] = useState();
    const { 
        addToList, removeFromList, inputValues : values, inputErrors : errors
    } = useContext(RecipeFormContext);

    function validateAndSubmitTag(e) {
        e.preventDefault();
        setDraftError(null);
        const trimmed = values.tagDraft.trim();
        const tagLength = trimmed.length;
        const tagExists = values.tags.findIndex(el => el.content === trimmed) > -1 ? true : false;
        if (tagLength < 4 || tagLength > 16) {
            return setDraftError('Tags must be between 4 and 16 characters')
        } 
        if (!/^[a-zA-Z]+$/.test(trimmed)) return setDraftError('Tags must contain letters only')
        if (tagExists) {
            return setDraftError('That tag has already been added');
        }
        addToList('tags', ['tagDraft'])
    }

    return (
        <ListInputWrapper
            direction="row"
            listErrorMsg={errors.tags}
        >
            <Input
                name="tagDraft"
                label={{text: "Add Tags"}}
                placeholder="e.g. keto, vegetarian, Korean, Mexican, etc"
                value={values.tagDraft}
                errorMsg={draftError}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === ",") 
                    validateAndSubmitTag(e)
                }} 
                onClick={e => validateAndSubmitTag(e)}
            />

            {values.tags && values.tags.length > 0 && values.tags.map((tag, i) => (
                <Tag 
                    key={tag.id}
                >
                    <button
                        type="button" 
                        onClick={(e) => {
                            e.preventDefault();
                            removeFromList('tags', tag.id)
                        }}
                    >X</button>
                    {tag.content}
                </Tag>
            ))}
        </ListInputWrapper>
    )
}

export default TagListInput;

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