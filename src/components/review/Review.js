import styled from 'styled-components'
import { transformImg } from '../../helpers';
import Ratings from '../recipe/Ratings';
import { EditBtnWrapper } from '../recipe/recipeEdit/EditBtnWrapper';

import AvatarLink from "../shared/AvatarLink";
import DeleteReview from './DeleteReview';
import EditReview from './EditReview';

function Review({review}) {
    console.log(review);
    const formattedDate = () => {
        let date = new Date(review.updatedAt).toDateString();
        return date.split(' ').slice(1).join(' ')
    };
    return (
        <Container>
            <EditReview review={review} />
            <DeleteBtnWrapper><DeleteReview review={review} /></DeleteBtnWrapper>
            <StyledHeader>
                <Flex>
                    <AvatarLink user={review.user} imgSize="30px" showNames />
                    {review.headline && <Headline>{review.headline}</Headline>}
                </Flex>
                <Ratings rating={review.rating} />
                <div className="review-date">{formattedDate()}</div>
            </StyledHeader>
            <StyledContent>
                <ReviewBody>{review.content}</ReviewBody>
                {review.reviewImg && (<ImgWrapper>
                    <img src={transformImg(review.reviewImg, 'c_fit,w_120')} />
                </ImgWrapper>)}
            </StyledContent>
        </Container>
    )
}

export default Review;

const Container = styled.div`
    font-size: .8rem;
    padding: 1rem .5rem;
    background-color: var(--lite-grey);
    position: relative;
`

const DeleteBtnWrapper = styled.span`
    position: absolute;
    top: .5rem;
    right: 2rem;
`

const StyledHeader = styled.div`
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 5px;
`

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const Headline = styled.span`
    margin-left: 5px;
    font-weight: 700;
`

const ImgWrapper = styled.div`
    width: 100px;
    height: 100px;
    margin-top: .5rem;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const StyledContent = styled.div`
    border-top: 1px solid white;
    padding-top: 1rem;
`

const ReviewBody = styled.p``

