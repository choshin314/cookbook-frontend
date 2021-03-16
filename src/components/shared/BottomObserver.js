import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

function BottomObserver({ onIntersect, loading }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    onIntersect()
                }
            })
        }, { rootMargin: '0px', threshold: .5 })
        let divRef = bottomRef.current;
        if (divRef) observer.observe(divRef)
        return () => {
            if (divRef) observer.unobserve(divRef)
        };
    }, [onIntersect])

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