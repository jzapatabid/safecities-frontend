import styled from "styled-components";
import theme from "styles/theme";

export const GlobalContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background-color: ${ theme.colors.blueDarkerTransparence};
`;
export const Modal = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background-color: ${ theme.colors.blueDarkerTransparence};
`;
export const Message = styled.h3`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    gap: 10px;
    background-color: ${ theme.colors.blueDarkerTransparence};
`;
export const AceptButton = styled.button`
    padding: 10px 30px;
    margin-top: 10px;
    border-radius: 5px;
    border: solid 2px white;
    background: transparent;
    color: white;
    scale: 1;
    transition: scale 0.1s ease;
    &:hover {
        scale: 1.1;
        transition: scale 0.1s ease;
    }
`;