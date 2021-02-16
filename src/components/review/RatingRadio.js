import styled from 'styled-components'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as starFull} from '@fortawesome/free-solid-svg-icons'
import {faStar as starEmpty} from '@fortawesome/free-regular-svg-icons'
import useToggle from '../../hooks/toggle'

export default function RatingRadio({ radioValue, rating }) {
    const [isFocused, toggleFocused] = useToggle();
    function determineStarFilling(radioValue, rating) {
        if (!rating) return starEmpty;
        return rating >= radioValue ? starFull : starEmpty;
    }
    return (
        <RadioWrapper>
            <StarLabel focused={isFocused} htmlFor={`review-rating-${radioValue}`}>
                <FontAwesomeIcon icon={determineStarFilling(radioValue, rating)} />
            </StarLabel>
            <HiddenRadio 
                id={`review-rating-${radioValue}`}
                type="radio" 
                name="rating" 
                value={radioValue} 
                checked={rating === radioValue} 
                tabIndex="0"
                onFocus={toggleFocused}
                onBlur={toggleFocused}
                onChange={() => {}}
            />
        </RadioWrapper>
    )
}

const RadioWrapper = styled.div`
    position: relative;
`
const StarLabel = styled.label`
    color: #ffa41c;
    cursor: pointer;
    outline: ${p => p.focused ? '1px dashed var(--dark-teal)' : 'none'};
`
const HiddenRadio = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
`