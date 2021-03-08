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
        if (ingredientDraft.qty.trim().length > 10) return setDraftError('Max 10 characters for qty');
        if (!ingredientDraft.unit) return setDraftError('Unit is required');
        const length = ingredientDraft.content.trim().length;
        if (length < 3) {
            return setDraftError('Minimum 3 characters per ingredient')
        } 
        addToList('ingredients', ingredientDraft);
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
