import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();
//Creating useContext that stretches through whole app and lets us know if the user is logged in or out based on its state. If the state is null then user is not logged in, if it has data it means user is logged in and that information is helpful for other steps

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};
const user = JSON.parse(localStorage.getItem('user'))


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: user,
  });

  useEffect(() => {
    if(user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
