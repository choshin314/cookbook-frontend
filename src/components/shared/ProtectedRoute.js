import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setFlash } from '../../redux/actions/flashActions'

function ProtectedRoute({ location, dispatchSetFlash, render, children, auth, ...rest }) {
    useEffect(() => {
        if (!auth.user) {
            dispatchSetFlash('info', 'Login required to access page')
        }
    }, [auth.user, dispatchSetFlash])
    
    return (
        <Route { ...rest} >
            {!auth.user && <Redirect to="/account/login" />}
            {auth.user && render ? render(auth.user) : children}
        </Route>
    )
}

const mapStateToProps = global => ({ auth: global.auth })
const mapDispatchToProps = { dispatchSetFlash: setFlash }
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)