
import * as S from './styles';
import { useContext} from 'react';
import { LanguageContext } from 'contexts/LanguageSelector/context';

const LanguageDropdown = () => {
    const {state, changeLanguage, languageDropdown} = useContext(LanguageContext);
    return (
        <S.GlobalContainer onClick={languageDropdown} >
            <S.Container>
                { state.text }
                <S.SelectorButton />
            </S.Container>
            {
                state.isOpen ? <S.LanguageUl>
                <S.LanguageLi  onClick={() => changeLanguage('Español')}> Español </S.LanguageLi>
                <S.LanguageLi onClick={() => changeLanguage('English')} > English</S.LanguageLi>
                <S.LanguageLi onClick={() => changeLanguage('Portugues')}> Portugues</S.LanguageLi>
                </S.LanguageUl> : ''
            }
        </S.GlobalContainer>
    )
}

export default LanguageDropdown;