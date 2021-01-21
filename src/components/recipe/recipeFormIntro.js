import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'

import { GridContainer, GridColumn, media } from '../commonStyles'
import ImgInput from '../shared/imgInput'
import Input from '../shared/input'
import TagInput from '../shared/tagInput'

function RecipeFormIntro({step, values, errors, handleChange, tags, setTags}) {

    return (
        <CSSTransition
            in={step === 1}
            appear={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <section>
                <Grid as="div" colsLg="6" gap="0">
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 .5rem 0 0">
                        <ImgInput name="coverImg" title="cover" onChange={handleChange} file={values.coverImg}/>
                    </GridColumn>
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                        <Input 
                            id="title"
                            name="title"
                            type="text" 
                            label={{ text: "Recipe Title", hide: false }}
                            placeholder="What are we making?" 
                            value={values.title}
                            onChange={handleChange}
                            errorMsg={errors.title}
                        />
                        <Input 
                            id="introText"
                            name="introText"
                            type="textarea"
                            placeholder="Give a short and sweet intro about your recipe"
                            label={{ text: "Introduction", hide: false }}
                            value={values.introText}
                            onChange={handleChange}
                            charLimit={400}
                            textRows={8}
                        />
                    </GridColumn>
                </Grid>
                <Grid as="div" colsLg="6" gap="0">
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 .5rem 0 0">
                        <TagInput tags={tags} setTags={setTags} />
                    </GridColumn>
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                        <Flex>
                            <Input 
                                id="prepTime"
                                name="prepTime"
                                type="number" 
                                min={1}
                                label={{ text: "Prep (Mins.)", hide: false }}
                                placeholder="" 
                                value={values.prepTime}
                                onChange={handleChange}
                                errorMsg={errors.prepTime}
                            />
                            <Input 
                                id="cookTime"
                                name="cookTime"
                                type="number" 
                                min={1}
                                label={{ text: "Cook (Mins.)", hide: false }}
                                placeholder="" 
                                value={values.cookTime}
                                onChange={handleChange}
                                errorMsg={errors.cookTime}
                            />
                            <Input 
                                id="servings"
                                name="servings"
                                type="number" 
                                min={1}
                                label={{ text: "Servings", hide: false }}
                                placeholder="" 
                                value={values.servings}
                                onChange={handleChange}
                                errorMsg={errors.servings}
                            />
                        </Flex>
                    </GridColumn>
                </Grid>
            </section>
        </CSSTransition>
    )
}

export default RecipeFormIntro;

const Grid = styled(GridContainer)`
    @media(min-width: ${media.full}) {
        margin-bottom: 2rem;
    }
`
const Flex = styled.div`
    display: flex;
    max-width: 100%;
    justify-content: space-between;
    > div {
        flex: 0 1 30%;
        max-width: 30%;
        & input {
            width: 100%;
        }
    }
`