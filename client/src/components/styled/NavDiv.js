import styled from 'styled-components'


const NavDiv = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    cursor: pointer;
    span{
        color: #000;
        color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        padding-left: 1rem;
        font-weight: bold;
        font-size: 1.5rem;
    }
    svg{
        path{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
        circle{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
        line{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
        polyline{
            color: ${props => props.clicked ? "#5F6FFF" : "#000"};
        }
    }
    `

    export default NavDiv