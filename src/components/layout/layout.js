import styled from 'styled-components';

import Header from './header'
import Footer from './footer'

function Layout({children}) {
    return (
        <FlexColumn>
            <Header />
            <ThreeColumn>
                <aside></aside>
                {children}
                <div></div>
            </ThreeColumn>
            <Footer />
        </FlexColumn>
    )
}

export default Layout;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    main {
        flex: 1 0 auto;
    }
`

const ThreeColumn = styled.div`
    display: flex;
    height: 100%;
    width: 100%;

    aside, *:last-child {
        flex: auto;
        position: relative;
    }
`
