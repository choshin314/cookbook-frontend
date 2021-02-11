import { useState } from 'react'

import Input from '../../shared/Input'
import ListDraggable from '../../shared/ListDraggable';
import Tag from '../../shared/Tag'

function TagListInput(props) {
    const [ draftError, setDraftError ] = useState();
    const { addToList, removeFromList, values, errors } = props;

    function validateAndSubmitTag(e) {
        e.preventDefault();
        setDraftError(null);
        const trimmed = values.tagDraft.trim();
        const tagLength = trimmed.length;
        const tagExists = values.tags.findIndex(el => el.content === trimmed) > -1 ? true : false;
        if (tagLength < 3 || tagLength > 20) return setDraftError('Tags must be 3 to 20 characters');
        if (!/^[a-zA-Z0-9-]+$/.test(trimmed)) return setDraftError('Tags can have letters, numbers, or hyphens');
        if (tagExists) return setDraftError('That tag has already been added');
        addToList('tags', ['tagDraft']);
    }

    const list = values.tags && values.tags.map((tag, i) => (
        <Tag key={tag.id} deletable={true} deleteTag={e => removeFromList('tags', tag.id)}>
            {tag.content}
        </Tag>
    ))

    return (
        <ListDraggable
            direction="row"
            listNoDrag={list}
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
        </ListDraggable>
    )
}

export default TagListInput;