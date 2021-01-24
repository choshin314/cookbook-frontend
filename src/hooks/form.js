import { useState } from 'react'
import {uuid} from 'uuidv4'

export function useForm(initInputVals, validateForm, handleSubmit) {

    const [ inputValues, setInputValues ] = useState(initInputVals);
    const [ inputErrors, setInputErrors ] = useState({}); 
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState(); //server error msg
    const [ success, setSuccess ] = useState(false);

    function handleChange(e) {
        const {name, value, type, files } = e.target;
        switch (type) {
            case "text":
                setInputValues({ ...inputValues, [name]: value });
                break;
            case "textarea":
                setInputValues({ ...inputValues, [name]: value });
                break;
            case "number":
                setInputValues({ ...inputValues, [name]: parseFloat(value) });
                break;
            case "file":
                setInputValues({ ...inputValues, [name]: files[0] });
                break;
        }
    }

    async function validateAndSubmit(e) {
        e.preventDefault();
        if (validateForm) {
            let errors = validateForm(inputValues); //returns errors obj 
            if (errors) return setInputErrors(errors); //exit before ajax 
        }
        setIsSubmitting(prev => true);
        await handleSubmit(inputValues, setFormErrors, setSuccess);
        setIsSubmitting(prev => !prev);
    }

    function addToList(listKey, draftKeys) {
        const newItem = { id: uuid() };
        const trimIfString = (value) => typeof value === "string" ? value.trim() : value;
        if (draftKeys.length === 1) { //for single value (e.g. instructionDraft)
            newItem.content = trimIfString(inputValues[draftKeys[0]])
        } else { //for multipart (e.g. ingDraft_name, ingDraft_qty, ingDraft_unit)
            draftKeys.forEach(key => {
                let keynameTail = key.split('_')[1]
                newItem[keynameTail] = trimIfString(inputValues[key])
            })
        } 

        const clearedDrafts = {};
        draftKeys.forEach(draftKey => clearedDrafts[draftKey] = '');

        setInputValues({
            ...inputValues,
            ...clearedDrafts,
            [listKey]: [...inputValues[listKey], newItem ]
        })
    }

    function removeFromList(listKey, listItemId) {
        const filtered = inputValues[listKey].filter(item => item.id !== listItemId);
        setInputValues({...inputValues, [listKey]: filtered });
    }

    function handleDragEnd(result) {
        const {source, destination} = result;
        if (!destination) return; 
        //disallow dragging items to other lists
        if (source.droppableId !== destination.droppableId) return; 
        if (    //if no delta, return
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return; 

        const newItems = [...inputValues[source.droppableId]];
        const draggedItem = newItems[source.index];
        newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, draggedItem);
        setInputValues(prev => ({...prev, [source.droppableId]: newItems}));
    }

    return { 
        inputValues, 
        handleChange,
        handleDragEnd,
        addToList,
        removeFromList,
        inputErrors, 
        isSubmitting, 
        formErrors, 
        success, 
        validateAndSubmit 
    };
}