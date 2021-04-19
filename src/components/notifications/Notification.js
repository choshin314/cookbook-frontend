import { useState } from 'react'
import { connect } from 'react-redux'

import NotificationNavBtn from "./NotificationNavBtn";
import NotificationList from './NotificationList';

function Notification() {
    const [ show, setShow ] = useState(false);
    const [ count, setCount ] = useState(2);
    const showNotifications = () => {
        setShow(true);
        setCount(0);
    }

    return (
        <>
            <NotificationNavBtn onClick={showNotifications} count={count} />
            <NotificationList show={show} notifications={mockNotifications} />
        </>
    )
}

export default Notification


const mockNotifications = [
    {
        id: 1,
        followerId: 123,
        followerUsername: 'abc123',
        reviewId: null,
        recipeId: null,
        recipeTitle: null,
        createdAt: new Date(),
        checked: false,
        type: "follow"
    },
    {
        id: 2,
        followerId: 133,
        followerUsername: 'bbc123',
        reviewId: null,
        recipeId: null,
        recipeTitle: null,
        createdAt: new Date(),
        checked: false,
        type: "follow"
    },
    {
        id: 3,
        followerId: null,
        followerUsername: null,
        reviewId: 2,
        recipeId: 22,
        recipeTitle: 'pork',
        createdAt: new Date(),
        checked: false,
        type: "review"
    },
    {
        id: 4,
        followerId: null,
        followerUsername: null,
        reviewId: 4,
        recipeId: 30,
        recipeTitle: 'beef',
        createdAt: new Date(),
        checked: false,
        type: "review"
    },
    {
        id: 5,
        followerId: 50,
        followerUsername: 'cababc123',
        reviewId: null,
        recipeId: null,
        recipeTitle: null,
        createdAt: new Date(),
        checked: false,
        type: "follow"
    }
]