import { useState } from 'react'
import {uuid} from 'uuidv4'

export function useForm(initInputVals, handleSubmit, validateForm) {

    const [ inputVals, setInputVals ] = useState(initInputVals);
    const [ inputErrors, setInputErrors ] = useState({}); 
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState(); //server error msg
    const [ success, setSuccess ] = useState(false);

    function handleChange(e) {
        const {name, value, type, files } = e.target;
        switch (type) {
            case "text":
                setInputVals({ ...inputVals, [name]: value });
                break;
            case "textarea":
                setInputVals({ ...inputVals, [name]: value });
                break;
            case "number":
                setInputVals({ ...inputVals, [name]: parseFloat(value) });
                break;
            case "file":
                setInputVals({ ...inputVals, [name]: files[0] });
                break;
        }
    }

    async function validateAndSubmit(e) {
        e.preventDefault();
        if (validateForm) {
            let errors = validateForm(inputVals); //returns errors obj 
            if (errors) return setInputErrors(errors); //exit before ajax 
        }
        setIsSubmitting(prev => true);
        await handleSubmit(inputVals, setFormErrors, setSuccess);
        setIsSubmitting(prev => !prev);
    }

    function addToList(listKey, draftKeys) {
        const newItem = { id: uuid() };
        const trimIfString = (value) => typeof value === "string" ? value.trim() : value;
        if (draftKeys.length === 1) { //for single value (e.g. instructionDraft)
            newItem.content = trimIfString(inputVals[draftKeys[0]])
        } else { //for multipart (e.g. ingDraft_name, ingDraft_qty, ingDraft_unit)
            draftKeys.forEach(key => {
                let keynameTail = key.split('_')[1]
                newItem[keynameTail] = trimIfString(inputVals[key])
            })
        } 

        const clearedDrafts = {};
        draftKeys.forEach(draftKey => clearedDrafts[draftKey] = '');

        setInputVals({
            ...inputVals,
            ...clearedDrafts,
            [listKey]: [...inputVals[listKey], newItem ]
        })
    }

    function removeFromList(listKey, listItemId) {
        const filtered = inputVals[listKey].filter(item => item.id !== listItemId);
        setInputVals({...inputVals, [listKey]: filtered });
    }

    return { 
        inputVals, 
        setInputVals,
        handleChange,
        addToList,
        removeFromList,
        inputErrors, 
        isSubmitting, 
        formErrors, 
        success, 
        validateAndSubmit 
    };
}