
import styled from "styled-components";
import theme from "styles/theme";

export const GlobalContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: visible;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;
    margin-right: 50px;
    margin-left: 60px;
    
`;

export const Container = styled.div`
    background-color: ${ theme.colors.blueDarker};
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 18px;
    font-family: Poppins;
    font-weight: 600; 
`;

export const LanguageUl = styled.ul`
    list-style-type: none;
    position: absolute;
    top: 60px;
    left: -30%;
    border: solid 2px white;
`;

export const LanguageLi = styled.li`
    background-color: ${ theme.colors.blueDarker};
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0px 20px 0px 15px;
    width: 175px;
    height: 66px;
    font-family: Poppins;
    font-weight: 600; 

    &:hover{
        background-color: #32435C;
        cursor: pointer;
    }
`;




export const SelectorButton = styled.div`
    width: 17px;
    height: 17px;
    background-image: url('/images/DownArrowIcon.svg');
    margin-left: 20px;
    background-size: cover;
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }

`;


export const containerLang = styled.div`
    position: absolute;
    height: 160px;
    width: 100px;
    top: 100px;
   
`;