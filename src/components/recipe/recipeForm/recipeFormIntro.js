import {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'
import {Draggable} from 'react-beautiful-dnd'

import { GridContainer, GridColumn, media } from '../../commonStyles'
import ImgInput from '../../shared/ImgInput'
import Input from '../../shared/Input'
import TagListInput from './TagListInput'
import ListInputWrapper from '../../shared/ListInputWrapper'

function RecipeFormIntro({step, values, errors, addToList, removeFromList}) {

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
                        <ImgInput 
                            name="coverImg" 
                            label={{ text: 'Cover Image' }} 
                            imgSize="5mb" 
                            file={values.coverImg}
                            errorMsg={errors.coverImg}
                        />
                    </GridColumn>
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                        <Input 
                            name="title"
                            value={values.title}
                            errorMsg={errors.title}
                            type="text" 
                            label={{ text: "Recipe Title", hide: false }}
                            placeholder="What are we making?" 
                        />
                        <Input 
                            name="introText"
                            value={values.introText}
                            errorMsg={errors.introText}
                            type="textarea"
                            placeholder="Give a short and sweet intro about your recipe"
                            label={{ text: "Introduction", hide: false }}
                            charLimit={400}
                            textRows={8}
                        />
                    </GridColumn>
                </Grid>
                <Grid as="div" colsLg="6" gap="0">
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 .5rem 0 0">
                        <TagListInput 
                            addToList={addToList} 
                            removeFromList={removeFromList} 
                            values={values} 
                            errors={errors}
                        />
                    </GridColumn>
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                        <Flex>
                            <Input 
                                name="prepTime"
                                value={values.prepTime}
                                errorMsg={errors.prepTime}
                                type="number" 
                                min={1}
                                label={{ text: "Prep (Mins.)", hide: false }}
                                placeholder="" 
                            />
                            <Input 
                                name="cookTime"
                                value={values.cookTime}
                                errorMsg={errors.cookTime}
                                type="number" 
                                min={1}
                                label={{ text: "Cook (Mins.)", hide: false }}
                                placeholder="" 
                            />
                            <Input 
                                name="servings"
                                value={values.servings}
                                errorMsg={errors.servings}
                                type="number" 
                                min={1}
                                label={{ text: "Servings", hide: false }}
                                placeholder="" 
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

