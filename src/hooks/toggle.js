import {useState} from 'react'

export default function useToggle(initState=false) {
    const [ isActive, setIsActive ] = useState(initState);
    function toggle() {
        setIsActive(prev => !prev)
    }
    return [ isActive, toggle ]
}   