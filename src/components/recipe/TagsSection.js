import RecipeSection from "./RecipeSection";
import Tag from "../shared/Tag";
import {EditBtnWrapper} from './recipeEdit/EditBtnWrapper'
import EditTags from "./recipeEdit/EditTags";

function TagsSection({tags, isOwnedByUser, recipe}) {
    return (
        <RecipeSection>
            {tags && tags.map(tag => <Tag key={tag.id}>{tag.content}</Tag>)}
            {isOwnedByUser && <EditBtnWrapper>
                <EditTags recipe={recipe} /> 
            </EditBtnWrapper>}
        </RecipeSection>
    )
}

export default TagsSection