import styled from 'styled-components';

import Header from './Header'
import Footer from './Footer'
import useScrollToTop from '../../hooks/scrollToTop'

function Layout({children}) {
    useScrollToTop()
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
    min-height: 100vh;
    height: 100%;
`

const ThreeColumn = styled.div`
    flex: 1 0 auto;
    display: flex;
    width: 100%;
    aside, & > *:last-child {
        flex: auto;
        position: relative;
    }
`
