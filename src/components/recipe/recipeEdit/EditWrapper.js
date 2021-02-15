import useToggle from '../../../hooks/toggle'
import ModalForm from '../../shared/ModalForm'
import EditBtn from '../../shared/EditBtn'

function EditWrapper({onChange, onSubmit, resetForm, height, maxWidth, children}) {
    const [ formOpen, toggleFormOpen ] = useToggle(false);
    
    return (
        <>
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
        </>
    )
}

export default EditWrapper;