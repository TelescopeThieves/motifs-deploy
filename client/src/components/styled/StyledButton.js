import styled from 'styled-components';

const StyledButton = styled.button.attrs((props) => ({
    bg: props.bg || "#fff",
    color: props.color || "black"
}))`
    display: flex;
    align-items: center;
    width: 15rem;
    height: 3.5rem;
    font-size: 1.2rem;
    justify-content: center;
    background: ${(props) => props.bg};
    border: solid 1px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transition: transform 600ms ease;
    cursor: pointer;
    span{
        color: ${(props) => props.color};
    }
`;

export default StyledButton