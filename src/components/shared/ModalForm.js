import { CSSTransition } from 'react-transition-group';
import styled, {css} from 'styled-components'

import useToggle from '../../hooks/toggle';
import { Form, CancelButton, SubmitButton, PopInStyles } from "../commonStyles";
import Modal from "./Modal";

function ModalForm(props) {
    const { open, toggleOpen, resetForm, onChange, onSubmit, height, maxWidth } = props;
    const [isIn, toggleIsIn] = useToggle(true);
    const delayToggleModal = () => {
        toggleIsIn();
        setTimeout(() => {
            if (resetForm) resetForm();
            toggleOpen();
        }, 200)
    }
    const submitAndClose = async (e) => {
        const submissionResult = await onSubmit(e);
        if (submissionResult.inputErrors || submissionResult.error) return;
        delayToggleModal();
    }
    
    return (
        <Modal modalOpen={open} toggleModal={delayToggleModal}>
            <CSSTransition 
                in={isIn}
                timeout={200}
                classNames="pop-in"
                appear={true}
                unmountOnExit={true}
            >
                <StyledForm onChange={onChange} onSubmit={submitAndClose} height={height} maxWidth={maxWidth}>
                    {props.children}
                    <Buttons>
                        <CancelButton type="button" onClick={delayToggleModal} >
                            Cancel
                        </CancelButton>
                        <SubmitButton type="submit">Submit</SubmitButton>
                    </Buttons>
                </StyledForm>
            </CSSTransition>
        </Modal>
    )
}

export default ModalForm;

const StyledForm = styled(Form)`
    position: fixed;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    max-height: 90%;
    overflow-y: auto;
    ${p => p.height ? css`
        height: ${p.height}; 
    ` : ''}
    ${p => p.maxWidth ? css`
        max-width: ${p.maxWidth}; 
    ` : ''}
    ${PopInStyles}
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: minmax(10px, 1fr) minmax(10px, 1fr);
    gap: .5rem;
`