import {useState, useEffect} from 'react'
import styled from 'styled-components'

import { GridContainer, CardWrapper, media } from '../commonStyles'
import ImgInput from '../shared/imgInput'

function RecipeForm() {
    const [file, setFile] = useState(null);

    return (
        <Card>
            <Form>
                <GridContainer as="div" colsLg="6" gap="0">
                    <GridColumn colsLg="3" >
                        <ImgInput title="cover" onChange={(e) => setFile(e.target.files[0])} file={file}/>
                    </GridColumn>
                </GridContainer>
            </Form>
        </Card>
    )
}

export default RecipeForm;

const Card = styled(CardWrapper)`
    margin: 1rem 0;
    :hover::before {
        opacity: 0;
    }
`

const Form = styled.form`
    background-color: #fff;
    border-radius: 5px;
    padding: 1rem;
    @media(min-width: ${media.medium}) {
        padding: 2rem;
    }
`
const GridColumn = styled.div`
    justify-self: ${props => props.justify || 'stretch'};
    @media(min-width: ${media.medium}) {
        grid-column: span ${props => props.colsMd || '1'};
    }
    @media(min-width: ${media.full}) {
        grid-column: span ${props => props.colsLg || props.colsMd || '1'};
    }
`
// export const GridContainer = styled.section`
//     display: grid;
//     grid-template-columns: repeat(${props => props.cols ? props.cols : '1'}, 1fr);
//     gap: ${props => props.gap ? props.gap : '1rem'};
//     @media(min-width: ${media.medium}) {
//         ${props => props.colsMd ? css`
//             grid-template-columns: repeat(${props => props.colsMd}, 1fr);
//             ` : ''
//         }
//     }
//     @media(min-width: ${media.full}) {
//         ${props => props.colsLg ? css`
//             grid-template-columns: repeat(${props => props.colsLg}, 1fr);
//             ` : ''
//         }
//     }
// `