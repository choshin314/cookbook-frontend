import { useState, useEffect } from 'react'
import {uuid} from 'uuidv4'

import { getLocalStorage, setLocalStorage } from '../helpers'

export function useForm(initValues, constraints, handleSubmit, formName=null, imgName) {
    const localValues = getLocalStorage(formName);
    const [ inputValues, setInputValues ] = useState(localValues || initValues);
    const [ inputErrors, setInputErrors ] = useState({}); 
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState([]); //server error msg
    const [ success, setSuccess ] = useState(null);

    useEffect(() => {
        setLocalStorage(formName, { ...inputValues, [imgName]: '' });
    }, [inputValues])

    function handleChange(e) {
        const {name, value, type, files } = e.target;
        switch (type) {
            case "number":
                setInputValues({ ...inputValues, [name]: parseFloat(value) });
                break;
            case "file":
                setInputValues({ ...inputValues, [name]: files[0] });
                break;
            default: 
                setInputValues({ ...inputValues, [name]: value });
        }
    }

    function clearInputs() {
        setInputValues(initValues);
        localStorage.removeItem(formName);
    }

    //useForm should take in constraints, which will get passed to the validation function
    //useForm should also take in handleSubmit
    //on form submit, validateAndSubmit will:
        //clear previous form error messages
        //call form validation function and return any validation errors
        //if errors, set error messages and exit before any ajax ops
    //if validation passes, set isSubmitting to true (mount loading spinner)
    //call the handleSubmit, which will return either:
        //an error message from the server, or
        //a 'success' object, which has the message to display on the success modal
        //and the next path to push to history (e.g., recipe page after recipe creation)
    async function validateAndSubmit(e) {
        e.preventDefault();
        console.log('hello')
        setInputErrors({});
        setFormErrors([]);
        const validationErrors = validateForm(inputValues, constraints); 
        //returns errors obj and arr, or null if validation passes 
        if (validationErrors) {
            setInputErrors(prev => validationErrors.inputErrors); 
            return setFormErrors(prev => validationErrors.formErrors);
        }   //exit before ajax 
        setIsSubmitting(prev => true);
        const { error, success } = await handleSubmit(inputValues);
        setIsSubmitting(prev => !prev);
        if (error) return setFormErrors([error]);
        if (success) {
            clearInputs();
            return setSuccess({ msg: success.msg, nextRoute: success.nextRoute });
        }
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

function getInitValuesConstraints(fields) {
    let initValues = {};
    let constraints = {};
    for (let key in fields) {
        initValues[key] = fields[key].value;
        constraints[key] = fields[key].constraints;
    }
    return {initValues, constraints};
}

function validateForm(values, constraints) {
    let inputErrors = {};
    let formErrors = [];
    for (let key in values) {
        if (!constraints[key]) continue;
        const { 
            required, minChars, maxChars, minItems, maxItems, pattern, size, type
        } = constraints[key]
        
        if (!required && !values[key]) continue; //skip validation if not required + no value

        if (pattern && pattern.regex && !pattern.regex.test(values[key])) {
            inputErrors[key] = pattern.failMsg;
            formErrors.push(`${key.toUpperCase()}: ${pattern.failMsg}`)
        }
        if (size && values[key].size > size) {
            let sizeDisplay = size < 1024000 ? `${size/1000}kb` : `${Math.round(size/1024000)}mb`
            inputErrors[key] = `Maximum file size is ${sizeDisplay}`;
            formErrors.push(`IMAGE: Maximum file size is ${sizeDisplay}`)
        }
        if (type && !type.includes(values[key].type)) {
            inputErrors[key] = `Must be one of the following: ${type.join(', ')}`;
            formErrors.push(`IMAGE: Accepted file types: ${type.join(', ')}`);
        }
        if (minChars && values[key].length < minChars) {
            inputErrors[key] = `*Minimum ${minChars} characters`;
            formErrors.push(`${key.toUpperCase()}: Minimum ${minChars} characters required`);
        }
        if (maxChars && values[key].length > maxChars) {
            inputErrors[key] = `*Maximum ${maxChars} characters`;
            formErrors.push(`${key.toUpperCase()}: Maximum ${maxChars} characters allowed`);
        }
        if (minItems && values[key].length < minItems) {
            inputErrors[key] = `*Minimum ${minItems} items`;
            formErrors.push(`${key.toUpperCase()}: Minimum ${minItems} items required`);
        }
        if (maxItems && values[key].length > maxItems) {
            inputErrors[key] = `*Maximum ${maxItems} items`;
            formErrors.push(`${key.toUpperCase()}: Maximum ${maxItems} items allowed`);
        }
        if (required && !values[key]) {
            inputErrors[key] = '*Required';
            formErrors.push(`${key.toUpperCase()}: Required`);
        }
    }
    return formErrors.length > 0 ? { inputErrors, formErrors } : null;
}