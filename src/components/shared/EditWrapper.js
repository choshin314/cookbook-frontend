import useToggle from '../../hooks/toggle'
import ModalForm from './ModalForm'
import EditBtn from './EditBtn'
import { EditBtnWrapper } from '../recipe/recipeEdit/EditBtnWrapper';
import Spinner from './Spinner'

function EditWrapper(props) {
    const {
        onChange, 
        onSubmit, 
        resetForm,
        isSubmitting, 
        height, 
        maxWidth, 
        children
    } = props;
    const [ formOpen, toggleFormOpen ] = useToggle(false);
    
    return (
        <EditBtnWrapper>
            <EditBtn onClick={toggleFormOpen} />
            {isSubmitting && <Spinner />}
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