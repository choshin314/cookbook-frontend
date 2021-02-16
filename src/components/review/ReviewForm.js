import styled from 'styled-components'

import ImgInput from '../shared/ImgInput'
import Input from '../shared/Input';
import RatingRadioGrp from './RatingRadioGrp';

function ReviewForm({ values, errors }) {
    return (
        <StyledDiv>
            <ImgInput 
                name="reviewImg"
                label={{text: "Optional Photo", hide: false }}
                file={values.reviewImg}
                errorMsg={errors.reviewImg}
                imgSize="1MB"
                previewSize="300px"
            />
            <RatingRadioGrp 
                rating={values.rating} 
                errorMsg={errors.rating} 
            />
            <Input 
                name="headline"
                value={values.headline}
                errorMsg={errors.headline}
                type="text"
                label={{ text: "Add a headline", hide: false }}
                placeholder="What's most important to know?"
            />
            <Input 
                name="content"
                value={values.content}
                errorMsg={errors.content}
                type="textarea"
                label={{ text: "Add a written review", hide: false }}
                placeholder="What did you like or dislike?  Were the instructions easy to follow?"
                textRows={5}
                charLimit={400}
            />
        </StyledDiv>
    )
}

export default ReviewForm;

const StyledDiv = styled.div`
    overflow-y: auto;
`