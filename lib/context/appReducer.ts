// lib/context/appReducer.ts

import { Action } from "./ actions";
import { AppState } from "./AppContext";

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'TOGGLE_RADIO':
      return { ...state, isRadioOn: !state.isRadioOn };
    case 'TOGGLE_LIGHT':
      return { ...state, isLightOn: !state.isLightOn };
    case 'TOGGLE_PHONE':
      return { ...state, isPhoneOn: !state.isPhoneOn };
      case 'CHANGE_MODAL':
        return { ...state, modalOpen: action.payload };
    default:
      return state;
  }
};

export default appReducer;
