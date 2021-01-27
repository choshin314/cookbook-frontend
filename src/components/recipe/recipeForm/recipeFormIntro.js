import {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'
import {Draggable} from 'react-beautiful-dnd'

import { GridContainer, GridColumn, media } from '../../commonStyles'
import ImgInput from '../../shared/imgInput'
import Input from '../../shared/input'
import TagListInput from './tagListInput'
import ListInputWrapper from '../../shared/listInputWrapper'

function RecipeFormIntro({step, inputValues, inputErrors}) {

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
                        <ImgInput name="coverImg" title="cover" file={inputValues.coverImg}/>
                    </GridColumn>
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                        <Input 
                            name="title"
                            value={inputValues.title}
                            errorMsg={inputErrors.title}
                            type="text" 
                            label={{ text: "Recipe Title", hide: false }}
                            placeholder="What are we making?" 
                        />
                        <Input 
                            name="introText"
                            value={inputValues.introText}
                            errorMsg={inputErrors.introText}
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
                        <TagListInput />
                    </GridColumn>
                    <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                        <Flex>
                            <Input 
                                name="prepTime"
                                value={inputValues.prepTime}
                                errorMsg={inputErrors.prepTime}
                                type="number" 
                                min={1}
                                label={{ text: "Prep (Mins.)", hide: false }}
                                placeholder="" 
                            />
                            <Input 
                                name="cookTime"
                                value={inputValues.cookTime}
                                errorMsg={inputErrors.cookTime}
                                type="number" 
                                min={1}
                                label={{ text: "Cook (Mins.)", hide: false }}
                                placeholder="" 
                            />
                            <Input 
                                name="servings"
                                value={inputValues.servings}
                                errorMsg={inputErrors.servings}
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

