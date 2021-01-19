import {useState, useEffect} from 'react'
import styled from 'styled-components'

import { GridContainer, GridColumn, CardWrapper, media } from '../commonStyles'
import ImgInput from '../shared/imgInput'
import Input from '../shared/input'
import TagInput from '../shared/tagInput'

function RecipeForm() {
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

    function handleChange(e) {
        let {name, value, type} = e.target;
        if (type === "number") {
            value = parseFloat(value);
        }
        setFormState({ ...formState, values: { ...formState.values, [name]: value } });
    }

    console.log(formState)

    return (
        <Card>
            <Form>
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
                        <Input 
                            id="prepTime"
                            name="prepTime"
                            type="number" 
                            min={1}
                            label={{ text: "Prep Time", hide: false }}
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
                            label={{ text: "Cook Time", hide: false }}
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
                    </GridColumn>
                </Grid>
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
const Grid = styled(GridContainer)`
    @media(min-width: ${media.full}) {
        margin-bottom: 2rem;
    }
`