import styled from 'styled-components';

import Header from './header'
import Footer from './footer'

function Layout({children}) {
    return (
        <FlexColumn>
            <Header />
            {children}
            <Footer />
        </FlexColumn>
    )
}

export default Layout;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    main {
        flex: 1 0 auto;
    }
`
