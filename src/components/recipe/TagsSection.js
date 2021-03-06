import RecipeSection from "./RecipeSection";
import Tag from "../shared/Tag";
import EditTags from "./recipeEdit/EditTags";
import styled from "styled-components";

function TagsSection({tags, isOwnedByUser, recipe}) {
    return (
        <RecipeSection sectionTitle="Tags">
            <StyledHorizontalList>
                {tags && tags.map(tag => <Tag key={tag.id}>{tag.content}</Tag>)}
            </StyledHorizontalList>
            {isOwnedByUser && <EditTags recipe={recipe} /> }
        </RecipeSection>
    )
}

export default TagsSection

const StyledHorizontalList = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    flex-wrap: wrap;
    font-size: .75rem;
`