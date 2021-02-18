import useToggle from '../../hooks/toggle'
import ModalForm from './ModalForm'
import EditBtn from './EditBtn'
import { EditBtnWrapper } from '../recipe/recipeEdit/EditBtnWrapper';

function EditWrapper({onChange, onSubmit, resetForm, height, maxWidth, children}) {
    const [ formOpen, toggleFormOpen ] = useToggle(false);
    
    return (
        <EditBtnWrapper>
            <EditBtn onClick={toggleFormOpen} />
            {formOpen && (
                <ModalForm 
                    open={formOpen} 
                    toggleOpen={toggleFormOpen} 
                    onChange={onChange} 
                    onSubmit={onSubmit}
                    resetForm={resetForm}
                    height={height}
                    maxWidth={maxWidth}
                >
                    {children}
                </ModalForm>
            )}
        </EditBtnWrapper>
    )
}

export default EditWrapper;