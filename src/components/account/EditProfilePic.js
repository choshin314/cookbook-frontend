import { connect } from "react-redux";
import EditWrapper from "../shared/EditWrapper";
import ImgInput from "../shared/ImgInput";
import EditSection from "./EditSection";
import { ACCOUNT_CONSTRAINTS } from '../../constants'
import useAccountEditForm from "../../hooks/accountEditForm";

function EditProfilePic({ user }) {

    const {
        inputValues, 
        inputErrors, 
        validateAndSubmit, 
        handleChange, 
        resetForm, 
        isSubmitting
    } = useAccountEditForm({ profilePic: null }, 'profile-pic')

    return (
        <EditSection
            section={{ title: "Profile Pic", img: true, currentValue: user.profilePic }}
        >
            <EditWrapper 
                onChange={handleChange}
                onSubmit={validateAndSubmit}
                resetForm={resetForm}
            >
                <ImgInput
                    name="profilePic"
                    file={inputValues.profilePic}
                    errorMsg={inputErrors.profilePic}
                    label={{ text: 'New Photo' }}
                    previewSize="100px"
                    imgSize="512kb"
                />
            </EditWrapper>
        </EditSection>
    )
}

const mapState = state => ({ user: state.auth.user })
export default connect(mapState)(EditProfilePic);