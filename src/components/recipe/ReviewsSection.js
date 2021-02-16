import styled from 'styled-components'
import ReviewFormContainer from '../review/ReviewFormContainer'
import RecipeSection from './RecipeSection'

function ReviewsSection(recipe, reviews, isOwnedByUser) {
    return (
        <RecipeSection>
            <ReviewFormContainer />
            <Reviews>
                <Review>
                    <div className="review-header">
                        <div className="review-avatar"></div>
                        <div className="review-rating"></div>
                        <div className="review-date"></div>
                    </div>
                    <div className="review-content">
                        <p>While using this I had a 16GB thumb drive and a 2TB external drive connected this this which was then plugged into my Mac. At some point it got the 2 devices confused and overwrote the 2TB drive with the contents of the 16GB thumb drive (lost close to a TB of photos. I have never seen the Mac get devices mixed up when seperate USB ports had these same devices. Later, with only the thumb drive connected, my Mac kept saying the thumb drive was disconnected unexpectedly. Seems fine for printers and my wireless keyboard, just not for storage devices.</p>
                    </div>
                </Review>
            </Reviews>
        </RecipeSection>
    )
}

export default ReviewsSection

const Reviews = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 600px;
    overflow-y: auto;
    & > li {
        margin-top: 1rem;
    }
`

const Review = styled.div`

`