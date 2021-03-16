import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

function BottomObserver({ onIntersect, loading, endOfList, root, deps=[] }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        const options = {
            root: root ? root() : null,
            rootMargin: '0px',
            threshold: .5
        }
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading && !endOfList) {
                    onIntersect()
                }
            })
        }, options)
        let divRef = bottomRef.current;
        observer.observe(divRef)
        return () => {
            observer.unobserve(divRef)
        };
    }, [endOfList, ...deps])

    return (
        <BottomDiv ref={bottomRef}>
            {loading && <Spinner />}
        </BottomDiv>
    )
}

export default BottomObserver

const BottomDiv = styled.div`
    position: relative;
    height: 2rem;
` 