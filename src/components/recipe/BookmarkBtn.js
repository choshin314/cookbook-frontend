import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faBookmark as bookmarkEmpty } from '@fortawesome/free-regular-svg-icons/faBookmark'
import { connect } from "react-redux";
import { toggleSocial } from "../../redux/actions/socialActions";
import { media } from '../commonStyles';

function BookmarkBtn({ recipe, auth, bookmarks, toggleBookmark }) {
    const currentBookmarks = bookmarks.recipeIds;

    if (auth.user && auth.user.id === recipe.user.id) return null;
    return (
        <StyledWrapper onClick={() => toggleBookmark('bookmarks', 'recipeIds', recipe.id)}>
            {currentBookmarks[recipe.id] && <FontAwesomeIcon icon={bookmarkSolid} />}
            {!currentBookmarks[recipe.id] && <FontAwesomeIcon icon={bookmarkEmpty} />}
        </StyledWrapper>
    )
}

const mapState = state => ({ auth: state.auth, bookmarks: state.social.bookmarks });
const mapDispatch = { toggleBookmark: toggleSocial }

export default connect(mapState, mapDispatch)(BookmarkBtn);

const StyledWrapper = styled.div`
    color: var(--accent);
    display: flex;
    align-items: center;
    cursor: pointer;
`