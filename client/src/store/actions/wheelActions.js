import * as actionTypes from './actionTypes'

const URL = "http://54.67.113.64:3000/api";
const options = (method, data) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
    },
    method: method,
    body: JSON.stringify(data)
  };
};

const formOptions = (method, data) => {
  var formData = new FormData();
  let keys = Object.keys(data);

  keys.map((key) => {
    // if( key !== 'image') {
      formData.append(key, data[key]);
    // }
  })
  
  return {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
    },
    method: method,
    body: formData
  };
};

export const getColorsRequest = () => {
  return dispatch => {
    return fetch(URL + '/color', options('get'))
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_COLORS,
        colors: res.colors,
      });
      return res;
    });
  }
}

export const addColorRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/color', options('post', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const editColorRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/color/' + data.color_id, options('put', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const deleteColorRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/color/' + data.color_id, options('delete', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const getLugpatternsRequest = () => {
  return dispatch => {
    return fetch(URL + '/lugpattern', options('get'))
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_LUGPATTERNS,
        lugpatterns: res.lugpatterns,
      });
      return res;
    });
  }
}

export const addLugpatternRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/lugpattern', options('post', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const editLugpatternRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/lugpattern/' + data.lugpattern_id, options('put', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const deleteLugpatternRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/lugpattern/' + data.lugpattern_id, options('delete', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const getCountriesRequest = () => {
  return dispatch => {
    return fetch(URL + '/country', options('get'))
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_COUNTRIES,
        countries: res.countries,
      });
      return res;
    });
  }
}

export const addCountryRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/country', options('post', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const editCountryRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/country/' + data.country_id, options('put', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const deleteCountryRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/country/' + data.country_id, options('delete', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const getMakesRequest = () => {
  return dispatch => {
    return fetch(URL + '/make', options('get'))
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_MAKES,
        makes: res.makes,
      });
      return res;
    });
  }
}

export const addMakeRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/make', options('post', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const editMakeRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/make/' + data.make_id, options('put', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const deleteMakeRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/make/' + data.make_id, options('delete', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const getWheelsRequest = () => {
  return dispatch => {
    return fetch(URL + '/wheel', options('get'))
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_WHEELS,
        wheels: res.wheels,
      });
      return res;
    });
  }
}

export const addWheelRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/wheel', formOptions('post', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const editWheelRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/wheel/' + data.wheel_id, formOptions('put', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}

export const deleteWheelRequest = (data) => {
  return dispatch => {
    return fetch(URL + '/wheel/' + data.wheel_id, options('delete', data))
    .then(res => res.json())
    .then(res => {
      return res;
    });
  }
}