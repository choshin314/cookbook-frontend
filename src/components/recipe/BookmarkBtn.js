import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faBookmark as bookmarkEmpty } from '@fortawesome/free-regular-svg-icons/faBookmark'
import { connect } from "react-redux";
import { addSocial, removeSocial } from "../../redux/actions/socialActions";
import { media } from '../commonStyles';

function BookmarkBtn({ recipeId, auth, bookmarks, addBookmark, removeBookmark }) {
    const currentBookmarks = bookmarks.recipeIds

    const toggleBookmark = (e) => {
        if (bookmarks.loading) return;
        if (currentBookmarks[recipeId]) removeBookmark('bookmarks', 'recipeIds', recipeId);
        if (!currentBookmarks[recipeId]) addBookmark('bookmarks', 'recipeIds', recipeId);
    }
    
    return (
        <StyledWrapper onClick={toggleBookmark}>
            {currentBookmarks[recipeId] && <FontAwesomeIcon icon={bookmarkSolid} />}
            {!currentBookmarks[recipeId] && <FontAwesomeIcon icon={bookmarkEmpty} />}
        </StyledWrapper>
    )
}

const mapState = state => ({ auth: state.auth, bookmarks: state.social.bookmarks });
const mapDispatch = { addBookmark: addSocial, removeBookmark: removeSocial }

export default connect(mapState, mapDispatch)(BookmarkBtn);

const StyledWrapper = styled.div`
    font-size: 1rem;
    color: black;
    border: 1px solid black;
    display: flex;
    align-items: center;
    @media(min-width: ${media.medium}) {
        font-size: 1.5rem;
    }
`