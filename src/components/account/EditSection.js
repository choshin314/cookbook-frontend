import styled, {css} from 'styled-components'
import genericAvatar from '../../assets/generic-avatar.png'
import { media } from '../commonStyles';

function EditSection({section, children}) {
    const { title, img, currentValue } = section;
    return (
        <StyledSection column={!!(title === "Short Bio")}>
            <StyledTitle>{title}</StyledTitle>
            {img && <StyledImgWrap>
                <img src={currentValue || genericAvatar} alt="Current profile pic" />
            </StyledImgWrap>}
            {!img && <div>{currentValue}</div>}
            {children}
        </StyledSection>
    )
}

export default EditSection

const StyledSection = styled.div`
    position: relative;
    border-top: 1px solid var(--lite-grey);
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${({column}) => column ? css`
        flex-direction: column;
        justify-content: center;
        align-items: start;
    ` : '' }
`

const StyledTitle = styled.h3`
    margin-bottom: .5rem;
`

const StyledImgWrap = styled.div`
    width: 80px;
    height: 80px;
    @media(min-width: ${media.medium}) {
        width: 100px;
        height: 100px;
    }
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`