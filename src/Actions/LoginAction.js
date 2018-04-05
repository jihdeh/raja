export const login = (token) => dispatch => {
  dispatch({
    type: 'IS_AUTHENTICATED',
    payload: token
  })
}
