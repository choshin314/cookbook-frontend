import { connect } from "react-redux";
import EditWrapper from "../shared/EditWrapper";
import Input from "../shared/Input";
import EditSection from "./EditSection";
import { ACCOUNT_CONSTRAINTS } from '../../constants'
import useAccountEditForm from "../../hooks/accountEditForm";

function EditUsername({ user }) {

    const {
        inputValues, 
        inputErrors, 
        validateAndSubmit, 
        handleChange, 
        resetForm, 
        isSubmitting
    } = useAccountEditForm({ username: '' }, 'general')

    return (
        <EditSection
            section={{ title: "Username", img: false, currentValue: user.username }}
        >
            <EditWrapper 
                onChange={handleChange}
                onSubmit={validateAndSubmit}
                resetForm={resetForm}
            >
                <Input
                    type="text"
                    name="username"
                    value={inputValues.username}
                    errorMsg={inputErrors.username}
                    label={{ text: 'Enter new username' }}
                />
            </EditWrapper>
        </EditSection>
    )
}

const mapState = state => ({ user: state.auth.user })
export default connect(mapState)(EditUsername);
