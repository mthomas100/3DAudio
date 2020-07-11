const minimizedArray = ['Music', 'Shape'];

export const generalStates = {
  minimizedArray
}




export const generalReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "minimizeWindow":
      return (
        state.minimizedArray.push(payload.toString())
      );
    case "maximizeWindow":
      return ([
        ...state.filter(e => {
          return e !== payload
        })
      ]);
    default:
      throw new Error("Unexpected action");
  }
};
