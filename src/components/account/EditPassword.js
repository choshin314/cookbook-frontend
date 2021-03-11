import { connect } from "react-redux";
import useAccountEditForm from "../../hooks/accountEditForm";
import EditWrapper from "../shared/EditWrapper";
import Input from "../shared/Input";
import EditSection from "./EditSection";

function EditPassword({ user }) {
    const {
        inputValues, 
        inputErrors, 
        validateAndSubmit, 
        handleChange, 
        resetForm, 
        isSubmitting
    } = useAccountEditForm(initValues(), 'password')

    return (
        <EditSection
            section={{ title: "Change Password", img: false }}
        >
            <EditWrapper 
                onChange={handleChange}
                onSubmit={validateAndSubmit}
                resetForm={resetForm}
                isSubmitting={isSubmitting}
            >
                <Input
                    type="password"
                    name="oldPassword"
                    value={inputValues.oldPassword}
                    errorMsg={inputErrors.oldPassword}
                    label={{ text: 'Enter current password' }}
                />
                <Input
                    type="password"
                    name="password"
                    value={inputValues.password}
                    errorMsg={inputErrors.password}
                    label={{ text: 'Enter new password' }}
                />
                <Input
                    type="password"
                    name="passwordConfirmation"
                    value={inputValues.passwordConfirmation}
                    errorMsg={inputErrors.passwordConfirmation}
                    label={{ text: 'Confirm new password' }}
                />
            </EditWrapper>
        </EditSection>
    )
}

const mapState = state => ({ user: state.auth.user })
export default connect(mapState)(EditPassword);

function initValues() {
    return {
        oldPassword: '',
        password: '',
        passwordConfirmation: ''
    }
}
