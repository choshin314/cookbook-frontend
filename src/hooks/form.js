import { useState, useEffect } from 'react'
import {uuid} from 'uuidv4'

import { getLocalStorage, setLocalStorage } from '../helpers'

export default function useForm(initValues, constraints, handleSubmit, formName=null, imgName=null) {
    const localValues = getLocalStorage(formName);
    const [ inputValues, setInputValues ] = useState(localValues || initValues);
    const [ inputErrors, setInputErrors ] = useState({}); 
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState([]); //server error msg

    useEffect(() => {
        if (!formName) return;
        setLocalStorage(formName, { ...inputValues, [imgName]: '' });
    }, [inputValues])

    useEffect(() => {
        return () => {
            if(formName) setLocalStorage(formName, initValues)
        }
    }, [])

    function clearErrors() {
        setInputErrors({});
        setFormErrors([]);
    }

    function resetForm() {
        setInputValues(initValues);
        setInputErrors({});
        setFormErrors([]);
    }

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

    function validateForm(values, constraints) {
        clearErrors();
        let inputErrors = {};
        let formErrors = [];
        for (let key in values) {
            if (!constraints[key]) continue;
            const { 
                required, minChars, maxChars, minItems, maxItems, pattern, match, size, type
            } = constraints[key]
            
            if (!required && !values[key]) continue; //skip validation if not required + no value
    
            if (pattern && pattern.regex && !pattern.regex.test(values[key])) {
                inputErrors[key] = pattern.failMsg;
                formErrors.push(`${key.toUpperCase()}: ${pattern.failMsg}`)
            }
            if (match && values[key] !== values[match]) {
                inputErrors[key] = `${key} must match ${match} field`;
                formErrors.push(`${key} must match ${match} field`);
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
        if (formErrors.length > 0) {
            setFormErrors(formErrors);
            setInputErrors(inputErrors);
            return true;
        }
        return false;
    }

    async function validateAndSubmit(e) {
        e.preventDefault();
        const validationErrors = validateForm(inputValues, constraints); 
        if (validationErrors) return { inputErrors: true }; 
        setIsSubmitting(prev => true);
        await handleSubmit(inputValues, setFormErrors, setIsSubmitting);
    }

    function addToList(listName, draftItem) {
        const newListItem = { id: uuid() };
        const trimIfString = (value) => typeof value === "string" ? value.trim() : value;
        for (let key in draftItem) {
            newListItem[key] = trimIfString(draftItem[key])
        }
        setInputValues({
            ...inputValues,
            [listName]: [...inputValues[listName], newListItem ]
        })
    }

    function removeFromList(listName, listItemId) {
        const filtered = inputValues[listName].filter(item => item.id !== listItemId);
        setInputValues({...inputValues, [listName]: filtered });
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
        inputErrors,
        formErrors,
        handleChange,
        handleDragEnd,
        addToList,
        removeFromList,
        resetForm,
        isSubmitting, 
        validateForm,
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

