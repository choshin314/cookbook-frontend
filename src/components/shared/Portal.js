import ReactDOM from 'react-dom'

function Portal({ children }) {
    const modalRoot = document.getElementById('portal');
    return ReactDOM.createPortal(children, modalRoot)
}

export default Portal;