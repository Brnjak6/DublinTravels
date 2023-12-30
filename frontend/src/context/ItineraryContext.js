import { createContext, useReducer } from 'react';

export const ItinerariesContext = createContext();

//useContext for itineraries where we can check anywhere from our app if the itineraries are present and we can change it in database depending on that
export const itinerariesReducer = (state, action) => {
  switch (action.type) {
    // We use this case for loading all the itineraries from database to our main page
    case 'SET_ITINERARIES':
      return {
        itineraries: action.payload,
      };
      // we add new itinerary, but we also load all the previos ones too
    case 'CREATE_ITINERARY':
      return {
        itineraries: [action.payload, ...state.itineraries],
      };
      // returning all itineraries except the one we want to delete
    case 'DELETE_ITINERARY':
      return {
        itineraries: state.itineraries.filter(
          (itinerary) => itinerary._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ItinerariesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itinerariesReducer, {
    itineraries: null,
  });

  return (
    <ItinerariesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItinerariesContext.Provider>
  );
};
