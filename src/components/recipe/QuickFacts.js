import styled from 'styled-components'
import useRecipeViewContext from '../../hooks/recipeViewContextHook'

import {media} from '../commonStyles'
import EditQuickFacts from './recipeEdit/EditQuickFacts';

function QuickFacts(props) {
    const { recipe, isOwnedByUser } = useRecipeViewContext();
    return (
        <Container>
        <Table>
            <caption>Recipe Time and Yield</caption>
            <thead>
                <tr>
                    <th scope="col">Prep</th>
                    <th scope="col">Cook</th>
                    <th scope="col">Total</th>
                    <th scope="col">Serves</th>
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
        {isOwnedByUser && <EditQuickFacts recipe={recipe} />}
        </Container>
    )
}

export default QuickFacts

const Container = styled.div`
    background-color: var(--lite-grey);
    padding: 1rem .5rem;
    border-radius: 5px;
    position: relative;
`

const Table = styled.table`
    border-radius: 5px;
    width: 100%;
    font-size: .75rem;
    caption {
        margin-bottom: 5px;
        font-size: 1rem;
        font-weight: 500;
    }
    tr {
        display: grid;
        grid-template-columns: repeat(4, minmax(10px, 1fr));
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

    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
`

const EditWrapper = styled.span`
    position: absolute;
    top: .5rem;
    right: .5rem;
    display: flex;
    align-items: start;
    color: ${p => p.light ? 'white' : 'var(--med-grey)'};
`