import {useState, useRef} from 'react'

import IngredientFieldset from './IngredientFieldset'
import ListDraggable from '../../shared/ListDraggable'

function IngredientListInput(props) {
    const fieldsetRef = useRef(null);
    const [ ingredientDraft, setIngredientDraft ] = useState({ qty: '', unit: '', content: '' });
    const [draftError, setDraftError] = useState();
    const { addToList, removeFromList, values, errors, listErrorMsg } = props;
    const { ingredients } = values;

    function validateAndAdd(e) {
        e.preventDefault();
        setDraftError(null);
        if (!ingredientDraft.qty) return setDraftError('Quantity is required');
        if (!ingredientDraft.content) return setDraftError('Ingredient is required');
        const finalDraft = {
            qty: ingredientDraft.qty.trim(),
            unit: ingredientDraft.unit.trim(),
            content: ingredientDraft.content.trim()
        }
        if (finalDraft.qty.length > 30) return setDraftError('Max 30 characters for qty');
        if (finalDraft.unit && finalDraft.unit.length > 30) return setDraftError('Max 30 characters for unit');
        if (finalDraft.content.length < 3) return setDraftError('Min3 characters per ingredient');
        if (finalDraft.content.length > 255) return setDraftError('Max 255 characters for ingredient');
        addToList('ingredients', finalDraft);
        setIngredientDraft({ qty: '', unit: '', content: '' });
        fieldsetRef.current.querySelector('input').focus() //refocus on "qty" input
    }

    function handleDraftChange(e) {
        const {name, value} = e.target;
        setIngredientDraft(prev => ({ ...prev, [name]: value }));
    }

    return (
        <ListDraggable
            list={ingredients}
            listName='ingredients'
            handleDelete={(itemId) => removeFromList('ingredients', itemId)}
            listErrorMsg={listErrorMsg}
            displayContent={(item) => (`${item.qty} ${item.unit} ${item.content}`)}
        >
            <IngredientFieldset 
                ref={fieldsetRef}
                values={ingredientDraft}
                errors={errors}
                addToList={validateAndAdd}
                draftError={draftError}
                onChange={handleDraftChange}
            />
        </ListDraggable>
    )
}

export default IngredientListInput;
