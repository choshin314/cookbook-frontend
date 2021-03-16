import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons'

import useToggle from '../../hooks/toggle'

function Checkbox({children}) {
    const [isChecked, toggleChecked] = useToggle();
    const [isFocused, toggleFocused] = useToggle();
    return (
        <Container>
            <label>
                <DisplayedBox focused={isFocused}>
                    <FontAwesomeIcon icon={isChecked ? faCheckSquare : faSquare} />
                </DisplayedBox>
                {children}
                <input type="checkbox" tabIndex="0" onClick={toggleChecked} onFocus={toggleFocused} onBlur={toggleFocused} />
            </label>
        </Container>
    )
}

export default Checkbox

const Container = styled.div`
    position: relative;
    input[type="checkbox"] {
        position: absolute;
        top: 0;
        height: 1px;
        width: 1px;
        opacity: 0;
    }
    label {
        display: flex;
        align-items: baseline;

    }
`

const DisplayedBox = styled.div`
    color: var(--teal);
    cursor: pointer;
    margin-right: 1rem;
    outline: ${props => props.focused ? '1px dashed var(--dark-teal)' : 'none'};
`