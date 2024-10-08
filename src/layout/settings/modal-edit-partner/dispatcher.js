import { handleSetCharacter, handleSetCharacterPartner, handleSetPartnerAva } from "../../../store/defaultState/actions";


export default dispatch => ({
    handleSetPartnerAva: (...args) => dispatch(handleSetPartnerAva(...args)),
    handleSetCharacter: (...args) => dispatch(handleSetCharacter(...args)),
    handleSetCharacterPartner: (...args) => dispatch(handleSetCharacterPartner(...args)),
});
