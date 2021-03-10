import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setReferrer } from '../../redux/actions/redirectActions'
import { setFlash } from '../../redux/actions/flashActions'

function ProtectedRoute({ location, dispatchSetReferrer, dispatchSetFlash, children, auth, ...rest }) {
    useEffect(() => {
        if (!auth.user) {
            dispatchSetReferrer(location.pathname)
            dispatchSetFlash('info', 'Login required to access page')
        }
    }, [])
    
    return (
        <Route { ...rest} >
            {auth.user ? children : <Redirect to="/account/login" />}
        </Route>
    )
}

const mapStateToProps = global => ({ auth: global.auth })
const mapDispatchToProps = { dispatchSetReferrer: setReferrer, dispatchSetFlash: setFlash }
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)