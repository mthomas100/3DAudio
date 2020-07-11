export const generalActions = (props) => {
  return {
    minimizeWindow: (windowName) => {
      props.dispatch({
        type: 'minimizeWindow',
        payload: windowName
      })
    },
    maximizeWindow: (windowName) => {
      props.dispatch({ 
        type: 'maximizeWindow', 
        payload: windowName 
      })
    }
  }
}
