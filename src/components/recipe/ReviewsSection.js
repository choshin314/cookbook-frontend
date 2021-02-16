import styled from 'styled-components'
import Review from '../review/Review'
import ReviewFormContainer from '../review/ReviewFormContainer'
import RecipeSection from './RecipeSection'

function ReviewsSection({recipe, reviews, isOwnedByUser}) {
    return (
        <RecipeSection sectionTitle="Reviews">
            {!isOwnedByUser && <ReviewFormContainer />}
            <Reviews marginTop={!isOwnedByUser}>
                {reviews && reviews.map(rev => <Review review={rev} key={rev.id} />)}
            </Reviews>
        </RecipeSection>
    )
}

export default ReviewsSection

const Reviews = styled.ol`
    list-style: none;
    padding: 0;
    margin: ${p => p.marginTop ? '.5rem 0 0 0' : '0' };
    max-height: 600px;
    overflow-y: auto;
    & > li {
        margin-top: 1rem;
    }
`
