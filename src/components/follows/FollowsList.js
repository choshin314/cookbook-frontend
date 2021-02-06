import { useHistory, useRouteMatch, Route, Link } from 'react-router-dom'

import Modal from "../shared/Modal";
import useToggle from '../../hooks/toggle'


function FollowsList({username, prevURL}) {
    const match = useRouteMatch();
    const history = useHistory();
    const [modalOpen, toggleModal] = useToggle(true)
    console.log('prevUrl   ', prevURL )

    return (
        <Modal backdrop modalOpen={modalOpen} toggleModal={() => {
            
            history.push(prevURL);
            toggleModal()
        }} >
            <h1>MODALLLLL</h1>
            <Route path={`${match.url}/followers`}>
                <div style={{background: 'yellow', width: '100px', height: '100px'}}></div>
                <Link to={`${match.url}/following`} >FOLLOWINGGGGGGG</Link>
            </Route>
            <Route path={`${match.url}/following`}>
                <div style={{background: 'blue', width: '100px', height: '100px'}}></div>
                <Link to={`${match.url}/followers`} >FOLLOWIERRRRRRRS</Link>
            </Route>
        </Modal>
    )
}

export default FollowsList
            