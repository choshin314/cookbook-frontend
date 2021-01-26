import { useState, useEffect } from 'react'
import {uuid} from 'uuidv4'

import { getLocalStorage, setLocalStorage } from '../helpers'

export function useForm(initValues, constraints, handleSubmit, formName=null, imgName) {
    const localValues = getLocalStorage(formName);
    const [ inputValues, setInputValues ] = useState(localValues || initValues);
    const [ inputErrors, setInputErrors ] = useState({}); 
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState([]); //server error msg
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        setLocalStorage(formName, { ...inputValues, [imgName]: '' });
    }, [inputValues])

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
        setInputErrors({});
        setFormErrors([]);
        let { inputWarnings, formWarnings } = validateForm(inputValues, constraints); //returns errors obj and arr 
        if (inputWarnings) {
            setInputErrors(prev => inputWarnings); 
            return setFormErrors(prev => formWarnings);
        }   //exit before ajax 
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
    let inputWarnings = {};
    let formWarnings = [];
    for (let key in values) {
        if (!constraints[key]) continue;
        const { 
            required, minChars, maxChars, minItems, maxItems, pattern, size, type
        } = constraints[key]

        if (pattern && pattern.regex && !pattern.regex.test(values[key])) {
            inputWarnings[key] = pattern.failMsg;
            formWarnings.push(`${key.toUpperCase()}: ${pattern.failMsg}`)
        }
        if (size && values[key].size > size) {
            let sizeDisplay = size < 1024 ? `${size}kb` : `${(size/1024).toFixed(1)}mb`
            inputWarnings[key] = `Maximum file size is ${sizeDisplay}`;
            formWarnings.push(`IMAGE: Maximum file size is ${sizeDisplay}`)
        }
        if (type && !type.includes(values[key].type)) {
            inputWarnings[key] = `Must be one of the following: ${type.join(', ')}`;
            formWarnings.push(`IMAGE: Accepted file types: ${type.join(', ')}`);
        }
        if (minChars && values[key].length < minChars) {
            inputWarnings[key] = `*Minimum ${minChars} characters`;
            formWarnings.push(`${key.toUpperCase()}: Minimum ${minChars} characters required`);
        }
        if (maxChars && values[key].length > maxChars) {
            inputWarnings[key] = `*Maximum ${maxChars} characters`;
            formWarnings.push(`${key.toUpperCase()}: Maximum ${maxChars} characters allowed`);
        }
        if (minItems && values[key].length < minItems) {
            inputWarnings[key] = `*Minimum ${minItems} items`;
            formWarnings.push(`${key.toUpperCase()}: Minimum ${minItems} items required`);
        }
        if (maxItems && values[key].length > maxItems) {
            inputWarnings[key] = `*Maximum ${maxItems} items`;
            formWarnings.push(`${key.toUpperCase()}: Maximum ${maxItems} items allowed`);
        }
        if (required && !values[key]) {
            inputWarnings[key] = '*Required';
            formWarnings.push(`${key.toUpperCase()}: Required`);
        }
    }
    return formWarnings.length > 0 ? { inputWarnings, formWarnings } : null;
}