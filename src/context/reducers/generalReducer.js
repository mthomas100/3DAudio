
export const generalStates = {
  minimizedArray : ['Shape', 'Camera', 'Music']
}




export const generalReducer = (state = generalStates, action) => {
  const { type, payload } = action;
  switch (type) {
    case "minimizeWindow":
      return {
        minimizedArray : [...state.minimizedArray.filter(e => {
          return e !== payload
        })]
      }
    case "maximizeWindow":
      return {
        minimizedArray : [...state.minimizedArray, payload]
      };
    default:
      throw new Error("Unexpected action");
  }
};



// return (
//   [...state.minimizedArray, payload]
// );


// return ([
//   ...state.minimizedArray.filter(e => {
//     return e !== payload
//   })
// ]);