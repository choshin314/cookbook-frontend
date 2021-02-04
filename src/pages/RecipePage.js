import { useEffect, useState } from 'react'
import styled from 'styled-components'

import {Main, PageTitle, Wrapper} from '../components/commonStyles'
import Ratings from '../components/recipe/Ratings'
import AvatarLink from '../components/shared/AvatarLink'
import IntroSection from '../components/recipe/IntroSection'
import IngredientsSection from '../components/recipe/IngredientsSection'
import InstructionsSection from '../components/recipe/InstructionsSection'
import { getAjax } from '../helpers/sendAjax'

function RecipePage({match}) {
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAjax(`/recipes/${match.params.id}`)
            .then(result => {
                if(result.error) setError(result.error);
                if(result.data) setRecipe(result.data);
                setLoading(prev => !prev);
            })
    }, [])

    return (
        <Main>
            {recipe && (<Container>
                <Wrapper as="div">
                    <PageTitle align="left">{recipe.title}</PageTitle>
                    <div className="margin-btm-1">
                        <Ratings rating={recipe.avgRating} reviewCount={recipe.reviewCount} />
                    </div>
                    <div className="margin-btm-1">
                        <AvatarLink userName="asdf"/>
                    </div>
                </Wrapper>
                <IntroSection 
                    coverImg={{ 
                        src: recipe.coverImg, 
                        alt: `${recipe.title} cover image` 
                    }}
                    servings={recipe.servings}
                    prepTime={recipe.prepTime}
                    cookTime={recipe.cookTime}
                />
                <IngredientsSection 
                    ingredients={recipe.ingredients}
                />
                <InstructionsSection
                    instructions={recipe.instructions}
                />
            </Container>)}
        </Main>
    )
}

export default RecipePage

const Container = styled.div`
    padding: 2rem 0;
`

const Headline = styled.div`
`


