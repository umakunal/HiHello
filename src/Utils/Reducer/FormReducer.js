export const formReducer = (state, action) => {
  const {inputId, validationResult, inputValue} = action;
  const updatedInputValues = {
    ...state.inputValues,
    [inputId]: inputValue,
  };
  const updatedValidities = {
    ...state.inputValidities,
    [inputId]: validationResult,
  };
  let updatedFormIsValid = true;

  for (const key in updatedValidities) {
    if (updatedValidities[key] !== undefined) {
      updatedFormIsValid = false;
      break;
    }
  }
  return {
    inputValidities: updatedValidities,
    inputValues: updatedInputValues,
    formIsValid: updatedFormIsValid,
  };
};
