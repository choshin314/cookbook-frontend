import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

function BottomObserver({ onIntersect, loading, endOfList, root }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        const options = {
            root: root ? root() : null,
            rootMargin: '0px',
            threshold: .5
        }
        console.log(options)
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading && !endOfList) {
                    onIntersect()
                }
            })
        }, options)
        observer.observe(bottomRef.current)
        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current)
        };
    }, [endOfList])

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