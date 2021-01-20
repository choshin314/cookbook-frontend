import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { GridContainer, GridColumn, CardWrapper, Button, media } from '../commonStyles'
import ImgInput from '../shared/imgInput'
import Input from '../shared/input'
import TagInput from '../shared/tagInput'

function RecipeForm() {
    const [firstPage, setFirstPage] = useState(true);
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [formState, setFormState] = useState({
        values: {
            title: "",
            introText: "",
            prepTime: "",
            cookTime: "",
            servings: ""
        },
        errors: {
        }
    });

    useEffect(() => window.scrollTo(0,0), [firstPage])

    function handleChange(e) {
        let {name, value, type} = e.target;
        if (type === "number") {
            value = parseFloat(value);
        }
        setFormState({ ...formState, values: { ...formState.values, [name]: value } });
    }

    return (
        
        <Card>
            <Form>
                {firstPage && (<CSSTransition
                    in={firstPage}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <section>
                        <Grid as="div" colsLg="6" gap="0">
                            <GridColumn colsLg="3" margin="1rem 0" marginLg="0 .5rem 0 0">
                                <ImgInput title="cover" onChange={(e) => setFile(e.target.files[0])} file={file}/>
                            </GridColumn>
                            <GridColumn colsLg="3" margin="1rem 0" marginLg="0 0 0 .5rem">
                                <Input 
                                    id="title"
                                    name="title"
                                    type="text" 
                                    label={{ text: "Recipe Title", hide: false }}
                                    placeholder="What are we making?" 
                                    value={formState.values.title}
                                    onChange={handleChange}
                                    errorMsg={formState.errors.title}
                                />
                                <Input 
                                    id="introText"
                                    name="introText"
                                    type="textarea"
                                    placeholder="Give a short and sweet intro about your recipe"
                                    label={{ text: "Introduction", hide: false }}
                                    value={formState.values.introText}
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
                                        value={formState.values.prepTime}
                                        onChange={handleChange}
                                        errorMsg={formState.errors.prepTime}
                                    />
                                    <Input 
                                        id="cookTime"
                                        name="cookTime"
                                        type="number" 
                                        min={1}
                                        label={{ text: "Cook (Mins.)", hide: false }}
                                        placeholder="" 
                                        value={formState.values.cookTime}
                                        onChange={handleChange}
                                        errorMsg={formState.errors.cookTime}
                                    />
                                    <Input 
                                        id="servings"
                                        name="servings"
                                        type="number" 
                                        min={1}
                                        label={{ text: "Servings", hide: false }}
                                        placeholder="" 
                                        value={formState.values.servings}
                                        onChange={handleChange}
                                        errorMsg={formState.errors.servings}
                                    />
                                </Flex>
                            </GridColumn>
                        </Grid>
                        <FormBtn 
                            className={firstPage && 'align-right'}
                            onClick={(e) => {
                                e.preventDefault();
                                setFirstPage(false);
                            }} 
                        >
                            <span>Add Instructions</span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </FormBtn>
                    </section>
                </CSSTransition>)}

                {!firstPage && (<CSSTransition
                    in={!firstPage}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <section>
                        <TagInput tags={tags} setTags={setTags} />
                        <FormBtn 
                            className={firstPage && 'align-right'}
                            onClick={(e) => {
                                e.preventDefault();
                                setFirstPage(true);
                            }} 
                        >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                            <span>Back to Intro</span>
                        </FormBtn>
                    </section>
                </CSSTransition>)}
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
    position: relative;
    @media(min-width: ${media.medium}) {
        padding: 2rem;
    }
    & > section {
        display: flex;
        flex-direction: column;
    }
    & > section.fade-appear {
        opacity: 0;
    }
    & > section.fade-appear-active {
        opacity: 1;
        transition: opacity .3s ease-out;
    }
    & > section.fade-enter {
        opacity: 0;
    }
    & > section.fade-enter-active {
        opacity: 1;
        transition: opacity .3s ease-out;
    }
    & > section.fade-exit {
        opacity: 1;
    }
    & > section.fade-exit-active {
        opacity: 0;
        transition: opacity .3s ease-out;
    }
`
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

const FormBtn = styled(Button)`
    flex-grow: 0;
    display: inline-block;
    align-self: start;
    span {
        margin: 0 0 0 .5rem;
    }
    &.align-right {
        align-self: end;
        span {
            margin: 0 .5rem 0 0;
        }
    }
`