import { useState } from 'react'
import styled from 'styled-components'
import FormFeedback from '../shared/FormFeedback'

import RatingRadio from './RatingRadio'

function RatingRadioGrp ({rating, errorMsg}) {
    return (
        <Container >
            <GroupLabel>Add a rating</GroupLabel>
            <RadioGroup title="Rate this recipe">
                <RatingRadio radioValue={1} rating={rating} />
                <RatingRadio radioValue={2} rating={rating} />
                <RatingRadio radioValue={3} rating={rating} />
                <RatingRadio radioValue={4} rating={rating} />
                <RatingRadio radioValue={5} rating={rating} />
            </RadioGroup>
            <FormFeedback errorMsg={errorMsg} />
        </Container>
    )
}

export default RatingRadioGrp


const Container = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.25;
`

const GroupLabel = styled.label`
    font-weight: 500;
    margin-top: .5rem;
    margin-bottom: .5rem;
`

const RadioGroup = styled.div`
    display: flex;
    padding: .5rem;
    border-bottom: 2px solid var(--lite-med-grey);
`
