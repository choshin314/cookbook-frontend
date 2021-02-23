import styled, {keyframes} from 'styled-components'

function Spinner(props) {
    return (
        <SpinningDiv size={props.size}></SpinningDiv>
    )
}

export default Spinner;

const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
        -webkit-transform: rotate(0deg);
    }
    100% { 
        transform: rotate(360deg); 
        -webkit-transform: rotate(360deg);
    }
`
const SpinningDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: ${p => p.size ? p.size : '50px'};
    height: ${p => p.size ? p.size : '50px'};
    background-color: transparent;
    border-radius: 50%;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    animation: ${spin} 2s linear infinite;
`
