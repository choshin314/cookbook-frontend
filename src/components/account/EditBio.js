import { connect } from "react-redux";
import EditWrapper from "../shared/EditWrapper";
import Input from "../shared/Input";
import EditSection from "./EditSection";
import useAccountEditForm from "../../hooks/accountEditForm";

function EditBio({ user }) {

    const {
        inputValues, 
        inputErrors, 
        validateAndSubmit, 
        handleChange, 
        resetForm, 
        isSubmitting
    } = useAccountEditForm({ bio: '' }, 'general')

    return (
        <EditSection
            column={true}
            section={{ title: "Short Bio", img: false, currentValue: user.bio }}
        >
            <EditWrapper 
                onChange={handleChange}
                onSubmit={validateAndSubmit}
                resetForm={resetForm}
                isSubmitting={isSubmitting}
            >
                <Input
                    type="textarea"
                    name="bio"
                    textRows={3}
                    charLimit={140}
                    value={inputValues.bio}
                    errorMsg={inputErrors.bio}
                    label={{ text: 'Enter new bio' }}
                />
            </EditWrapper>
        </EditSection>
    )
}

const mapState = state => ({ user: state.auth.user })
export default connect(mapState)(EditBio);