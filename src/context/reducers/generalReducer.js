
export const generalStates = {
  minimizedArray : ['Shape', 'Camera', 'Music']
}




export const generalReducer = (state = generalStates, action) => {
  const { type, payload } = action;
  switch (type) {
    case "minimizeWindow":
      return {
        minimizedArray : [...state.minimizedArray, payload]
      };
    case "maximizeWindow":
      return {
        minimizedArray : [...state.minimizedArray.filter(e => {
          return e !== payload
        })]
      };
    default:
      throw new Error("Unexpected action");
  }
};