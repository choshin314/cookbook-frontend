import styled from 'styled-components'

export default function Footer() {
    return (
        <StyledFooter>
            <p>Cookbook was created by <a href="https://shincho.me" target="_blank">Shin Cho</a></p>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    padding: 1rem 0;
    background-color: var(--lite-grey);
    text-align: center;
    font-size: 1.15rem;
    a {
        font-weight: 600;
    }
`