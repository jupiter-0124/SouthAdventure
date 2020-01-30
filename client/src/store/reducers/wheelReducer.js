import * as actionTypes from '../actions/actionTypes';

const initialState = {
  wheels: [],
  makes: [],
  countries: [],
  lugpatterns: [],
  colors: [],
  errors: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COLORS: {
      return {
        ...state,
        colors: action.colors,
      };
    }
    case actionTypes.GET_LUGPATTERNS: {
      return {
        ...state,
        lugpatterns: action.lugpatterns,
      };
    }
    case actionTypes.GET_COUNTRIES: {
      return {
        ...state,
        countries: action.countries,
      };
    }
    case actionTypes.GET_MAKES: {
      return {
        ...state,
        makes: action.makes,
      };
    }
    case actionTypes.GET_WHEELS: {
      return {
        ...state,
        wheels: action.wheels,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;