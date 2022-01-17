import styled from 'styled-components'

const Three = styled.div`
    display: flex;
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    height: 33%;
`

export default Three;