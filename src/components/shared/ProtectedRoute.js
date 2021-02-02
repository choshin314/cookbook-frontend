import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setReferrer } from '../../redux/actions/redirectActions'

function ProtectedRoute({ location, setReferrer, children, auth, ...rest }) {
    useEffect(() => {
        if (!auth.user) setReferrer(location.pathname)
    }, [])
    
    return (
        <Route { ...rest} >
            {auth.user ? children : <Redirect to="/account/login" />}
        </Route>
    )
}

const mapStateToProps = global => ({ auth: global.auth })
const mapDispatchToProps = { setReferrer: setReferrer }
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)