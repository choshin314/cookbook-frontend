import styled from 'styled-components';

import Header from './header'

function Layout({children}) {
    return (
        <FlexColumn>
            <Header />
            {children}
            <footer>footer</footer>
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
