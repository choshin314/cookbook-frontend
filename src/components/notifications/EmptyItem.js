import styled from 'styled-components'

function EmptyItem() {
    return (
        <ListItem>
            You'll see notifications here when someone follows you or reviews one of your recipes!
        </ListItem>
    )
}

export default EmptyItem

const ListItem = styled.li`
    padding: .75rem .5rem;
    border-bottom: 2px solid rgba(10,10,10,.1);
    cursor: pointer;
    font-size: .75rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
`