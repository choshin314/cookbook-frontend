import {useState} from 'react'
import DeleteBtn from '../shared/DeleteBtn';
import styled from 'styled-components';
import Modal from '../shared/Modal';
import { CancelButton, SubmitButton } from '../commonStyles'
import useToggle from '../../hooks/toggle';

function DeleteRecipe({ onDelete }) {
    const [ isOpen, toggleIsOpen ] = useToggle(false);
    const [isIn, toggleIsIn] = useToggle(true);
    const delayToggleModal = () => {
        toggleIsIn();
        setTimeout(() => {
            toggleIsOpen();
        }, 200)
    }
    return (
        <>
            <DeleteBtn onClick={toggleIsOpen} />
            {isOpen && (<Modal backdrop={true} modalOpen={isIn} toggleModal={toggleIsOpen}>
                <Confirmation>
                    <span>Are you sure you want to delete this recipe?</span>
                    <ButtonDiv>
                        <CancelButton onClick={toggleIsOpen}>Cancel</CancelButton>
                        <SubmitButton onClick={onDelete}>Delete</SubmitButton>
                    </ButtonDiv>
                </Confirmation>
            </Modal>)}
        </>
    )
}

export default DeleteRecipe

const Confirmation = styled.div`
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 1rem;
    border-radius: 5px;
    z-index: 3;
`

const ButtonDiv = styled.div`
    display: flex;
    margin-top: 1rem;
`