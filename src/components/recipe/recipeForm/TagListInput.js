import { useState } from 'react'

import Input from '../../shared/Input'
import ListDraggable from '../../shared/ListDraggable';
import Tag from '../../shared/Tag'

function TagListInput(props) {
    const [ tagDraft, setTagDraft ] = useState({ content: '' });
    const [ draftError, setDraftError ] = useState();
    const { addToList, removeFromList, values, errors } = props;

    function validateAndSubmitTag(e) {
        e.preventDefault();
        setDraftError(null);
        const trimmed = tagDraft.content.trim();
        const tagLength = trimmed.length;
        const existingIdx = values.tags.findIndex(el => el.content.toLowerCase() === trimmed.toLowerCase());
        if (tagLength < 3 || tagLength > 20) return setDraftError('Tags must be 3 to 20 characters');
        if (!/^[a-zA-Z0-9-]+$/.test(trimmed)) return setDraftError('Tags can have letters, numbers, or hyphens');
        if (existingIdx > -1) return setDraftError('That tag has already been added');
        addToList('tags', tagDraft);
        setTagDraft({ content: '' });
    }

    function handleDraftChange(e) {
        setTagDraft({ content: e.target.value });
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
                value={tagDraft.content}
                errorMsg={draftError}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === ",") 
                    validateAndSubmitTag(e)
                }} 
                onClick={e => validateAndSubmitTag(e)}
                onChange={handleDraftChange}
            />
        </ListDraggable>
    )
}

export default TagListInput;