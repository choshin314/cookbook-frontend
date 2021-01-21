import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import {Button} from '../commonStyles'

function AddBtn(props) {
    return (
        <Btn type="button" onClick={props.onClick}>
            <FontAwesomeIcon icon={faPlus} />
        </Btn>
    )
}

export default AddBtn

const Btn = styled(Button)`
    padding: .5rem;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: 15px;
`