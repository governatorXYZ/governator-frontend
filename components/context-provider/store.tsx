const reducer = (state: any, action: any) => {
console.log("IN REDUCER",action)
  const newState = { ...state }
  switch (action.type) {
    case 'crumb-update':
      const { crumb } = action
      console.log(JSON.stringify(crumb,null,2))
      newState.crumbs.push(crumb)
      
      console.log(JSON.stringify(newState,null,2))
      return newState

    default:
      return state
  }
}

export default reducer
