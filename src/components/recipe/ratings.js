import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as starFull, faStarHalfAlt as starHalf} from '@fortawesome/free-solid-svg-icons'
import {faStar as starEmpty} from '@fortawesome/free-regular-svg-icons'

function Ratings({rating, reviewCount}) {
    function determineStarFilling(starNum, rating) {
        let halfStarMin = starNum - 0.75;
        let fullStarMin = starNum - .25;
        if (rating >= fullStarMin) {
            return starFull
        } else if (rating >= halfStarMin) {
            return starHalf
        } else {
            return starEmpty
        }
    }
    return (
        <Container title={`${rating} Stars`}>
            <FontAwesomeIcon icon={determineStarFilling(1, rating)} />
            <FontAwesomeIcon icon={determineStarFilling(2, rating)} />
            <FontAwesomeIcon icon={determineStarFilling(3, rating)} />
            <FontAwesomeIcon icon={determineStarFilling(4, rating)} />
            <FontAwesomeIcon icon={determineStarFilling(5, rating)} />
            <span>({reviewCount})</span>
        </Container>
    )
}

export default Ratings


const Container = styled.div`
    display: flex;
    color: #ffa41c;
    span {
        color: var(--med-grey);
        margin-left: 5px;
        font-weight: 500;
    }
`