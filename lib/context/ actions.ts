type ToggleModalPayload = { name : string, parameters? : any}

export type Action =
  | { type: 'TOGGLE_RADIO' }
  | { type: 'TOGGLE_LIGHT' }
  | { type: 'TOGGLE_PHONE' }
  | { type: 'CHANGE_MODAL', payload : ToggleModalPayload };

export const toggleRadio = (): Action => ({
  type: 'TOGGLE_RADIO',
});

export const toggleLight = (): Action => ({
  type: 'TOGGLE_LIGHT',
});

export const togglePhone = (): Action => ({
  type: 'TOGGLE_PHONE',
});

export const changeModal = (payload : ToggleModalPayload): Action => ({
  type: 'CHANGE_MODAL',
  payload
});
