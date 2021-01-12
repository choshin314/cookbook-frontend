import styled from 'styled-components'

import {media} from '../commonStyles'

function QuickFacts(props) {
    return (
        <Container>
        <Table>
            <caption>Recipe Time and Yield</caption>
            <thead>
                <tr>
                    <th scope="col">Prep</th>
                    <th scope="col">Cook</th>
                    <th scope="col">Total</th>
                    <th scope="col">Servings</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.prepTime} mins</td>
                    <td>{props.cookTime} mins</td>
                    <td>{props.prepTime + props.cookTime} mins</td>
                    <td>{props.servings}</td>
                </tr>
            </tbody>
        </Table>
        </Container>
    )
}

export default QuickFacts

const Container = styled.div`
    background-color: var(--lite-grey);
    padding: 1rem .5rem;
    border-radius: 5px;
`

const Table = styled.table`
    border-radius: 5px;
    width: 100%;
    caption {
        margin-bottom: 5px;
        font-size: 1.5rem;
        font-weight: 500;
    }
    tr {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
    }

    thead {
        background-color: var(--teal);
        color: white;
    }
    tbody {
        background-color: white;
    }

    td, th {
        padding: .5rem 1rem;
    }

    @media(min-width: ${media.full}) {
        font-size: 1.25rem;
    }
`