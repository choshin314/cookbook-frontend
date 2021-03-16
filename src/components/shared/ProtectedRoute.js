import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setFlash } from '../../redux/actions/flashActions'

function ProtectedRoute({ location, dispatchSetFlash, children, auth, ...rest }) {
    useEffect(() => {
        if (!auth.user) {
            dispatchSetFlash('info', 'Login required to access page')
        }
    }, [auth.user])
    
    return (
        <Route { ...rest} >
            {auth.user ? children : <Redirect to="/account/login" />}
        </Route>
    )
}

const mapStateToProps = global => ({ auth: global.auth })
const mapDispatchToProps = { dispatchSetFlash: setFlash }
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)