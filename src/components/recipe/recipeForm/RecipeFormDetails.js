import {CSSTransition} from 'react-transition-group'

import InstructionListInput from './InstructionListInput'
import IngredientListInput from './IngredientListInput'

function RecipeFormDetails(props) {
    const {
        step, values, errors, addToList, removeFromList
    } = props;

    return (
        <CSSTransition
            in={step === 2}
            appear={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <>
            <section>
                <IngredientListInput 
                    addToList={addToList}
                    removeFromList={removeFromList}
                    values={values}
                    errors={errors}
                />
            </section>
            <section>
                <InstructionListInput 
                    addToList={addToList}
                    removeFromList={removeFromList}
                    values={values}
                    errors={errors}
                />
            </section>
            </>
        </CSSTransition>
    )
}

export default RecipeFormDetails;
