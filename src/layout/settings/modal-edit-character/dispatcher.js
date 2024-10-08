import { handleSetCharacter, handleSetCharacterPartner, handleSetMainAva } from "../../../store/defaultState/actions";


export default dispatch => ({
    handleSetMainAva: (...args) => dispatch(handleSetMainAva(...args)),
    handleSetCharacter: (...args) => dispatch(handleSetCharacter(...args)),
    handleSetCharacterPartner: (...args) => dispatch(handleSetCharacterPartner(...args)),
});
