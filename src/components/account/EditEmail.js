import { connect } from "react-redux";
import EditWrapper from "../shared/EditWrapper";
import Input from "../shared/Input";
import EditSection from "./EditSection";
import { ACCOUNT_CONSTRAINTS } from '../../constants'
import useAccountEditForm from "../../hooks/accountEditForm";

function EditEmail({ user }) {

    const {
        inputValues, 
        inputErrors, 
        validateAndSubmit, 
        handleChange, 
        resetForm, 
        isSubmitting
    } = useAccountEditForm({email: ''}, 'general')

    return (
        <EditSection
            section={{ title: "Email Address", img: false, currentValue: user.email }}
        >
            <EditWrapper 
                onChange={handleChange}
                onSubmit={validateAndSubmit}
                resetForm={resetForm}
            >
                <Input
                    type="email"
                    name="email"
                    value={inputValues.email}
                    errorMsg={inputErrors.email}
                    label={{ text: 'Enter new email address' }}
                />
            </EditWrapper>
        </EditSection>
    )
}

const mapState = state => ({ user: state.auth.user })
export default connect(mapState)(EditEmail);
