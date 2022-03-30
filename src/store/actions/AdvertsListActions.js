import { ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCCESS, ADVERTS_LOADED_FAILURE, ADVERTS_CATEGORY_FAILURE, ADVERTS_CATEGORY_REQUEST, ADVERTS_CATEGORY_SUCCESS} from '../types';
import { areAdvertsLoaded } from '../selectors/selectors';

export function advertsLoadedRequest() {
  return {
    type: ADVERTS_LOADED_REQUEST
  };
}

export function advertsLoadedSuccess(adverts) {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts
  };
}

export function advertsLoadedFailure(error) {
  return {
    type: ADVERTS_LOADED_FAILURE,
    error: true,
    payload: error
  };
}

export function advertsCategoryRequest(){
  return {
    type: ADVERTS_CATEGORY_REQUEST
  };
}

export function advertsCategorySuccess(adverts){
  return {
    type: ADVERTS_CATEGORY_SUCCESS,
    payload: adverts
  };
}

export function advertsCategoryFailure(error){
  return {
    type: ADVERTS_CATEGORY_FAILURE,
    error: true,
    payload: error
  };
}

export function loadAdverts() {
  return async function (dispatch, getState, { api }) {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getLatestAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
}

export function loadPaginatedAdverts() {
  return async function (dispatch, getState, { api }) {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getLatestPaginatedAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
}

export function loadAdvertsByCategory(id){
  return async function (dispatch, getState, { api }) {
    dispatch(advertsCategoryRequest());
    try {
      const adverts = await api.adverts.getAdvertsByCategory(id);
      dispatch(advertsCategorySuccess(adverts));
    } catch (error) {
      dispatch(advertsCategoryFailure(error));
    }
  };
}

export function loadAdvertsByName(name){
  return async function (dispatch, getState, { api }) {
    dispatch(advertsCategoryRequest());
    try {
      const adverts = await api.adverts.getAdvertsByName(name);
      console.log("ADVERTS", adverts);
      dispatch(advertsCategorySuccess(adverts));
    } catch (error) {
      dispatch(advertsCategoryFailure(error));
    }
  };
}
