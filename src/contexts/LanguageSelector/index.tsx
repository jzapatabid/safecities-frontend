import { useEffect, useReducer } from "react"
import { LanguageContext } from "./context"
import English from '../../lang/en.json'
import Spanish from '../../lang/es.json'
import Portugues from '../../lang/pt.json'

export const reducer = (state:any, action:any) => {
    switch (action.type) {
      case "DropDown":
        return {...state, isOpen: action.value.isOpen}
      case "Español":
        return {...state, text: action.value.text, messages: action.value.messages}
      case "English":
        return {...state, text: action.value.text, messages: action.value.messages}
      case "Portugues":
        return {...state, text: action.value.text, messages: action.value.messages}
      default:
        break;
    }
}
const LanguageProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(reducer, {text: "", messages: {}, isOpen: false})
    const languageDropdown = () => {
        dispatch({type: "DropDown", value: {...state, isOpen: !state.isOpen}})
    }
    const changeLanguage =(lang: string) => {
        localStorage.setItem("lang", lang)
        switch (lang) {
            case "Español":
                dispatch({type: lang, value: {text: lang, messages: {...Spanish}, isOpen: false}})
                break;
            case "English":
                dispatch({type: lang, value: {text: lang, messages: {...English}, isOpen: false}})
                break;
            case "Portugues":
                dispatch({type: lang, value: {text: lang, messages: {...Portugues}, isOpen: false}})
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        const langSel = "lang" in localStorage ? localStorage.getItem("lang") : "Español"
        changeLanguage(langSel!)
    }, []);
  return (
    <LanguageContext.Provider value={{state, changeLanguage, languageDropdown}}>
        {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider