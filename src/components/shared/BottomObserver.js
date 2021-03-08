import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

function BottomObserver({ onIntersect, loading, endOfList }) {
    const bottomRef = useRef(null);
    useEffect(() => {
        if(bottomRef.current) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1
            }
            const observer = new IntersectionObserver((entries, observer) => {
                const waitTilLoadThenFetch = () => {
                    if (loading) {
                        setTimeout(waitTilLoadThenFetch, 300)
                    } else {
                        onIntersect();
                    }
                }
                entries.forEach(entry => {
                    if (entry.isIntersecting && !loading && !endOfList) {
                        waitTilLoadThenFetch();
                    }
                })
            })
            observer.observe(bottomRef.current);
        }
    }, [bottomRef.current])
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