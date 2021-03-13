import { Helmet } from 'react-helmet'

function HelmetHead({ title }) {
    return (
        <Helmet>
            <title>{title} | Cookbook</title>
        </Helmet>
    )
}

export default HelmetHead