import {useState, useRef} from 'react'

import IngredientFieldset from './IngredientFieldset'
import ListDraggable from '../../shared/ListDraggable'

function IngredientListInput(props) {
    const fieldsetRef = useRef(null);
    const [draftError, setDraftError] = useState();
    const { addToList, removeFromList, values, errors, listErrorMsg } = props;
    const { 
        ingredients, 
        ingredientDraft_qty, 
        ingredientDraft_unit, 
        ingredientDraft_content 
    } = values;

    function validateAndAdd(e) {
        e.preventDefault();
        setDraftError(null);
        if (!ingredientDraft_qty) return setDraftError('Quantity is required');
        if (!ingredientDraft_unit) return setDraftError('Unit is required');
        const length = ingredientDraft_content.trim().length;
        if (length < 3) {
            return setDraftError('Ingredients must be at least 3 characters')
        } 
        addToList('ingredients', ['ingredientDraft_unit','ingredientDraft_qty','ingredientDraft_content'])
        fieldsetRef.current.querySelector('input').focus() //refocus on "qty" input
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
                values={values}
                errors={errors}
                addToList={validateAndAdd}
                draftError={draftError}
            />
        </ListDraggable>
    )
}

export default IngredientListInput;
