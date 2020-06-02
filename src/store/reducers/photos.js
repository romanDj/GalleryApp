import {
  PHOTOS_LOAD,
  PHOTOS_SWAP,
  ASYNC_START,
  ASYNC_END,
  PAGES_INCREMENT,
  PHOTO_LOAD,
  PHOTO_UNLOAD,
} from '../actions';

const initialState = {
  photos: [],
  loaded: false,
  page: 1,
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PHOTOS_LOAD:
      return {...state, photos: action.payload};
    case PHOTOS_SWAP:
      return {...state, photos: [...state.photos, ...action.payload]};
    case ASYNC_START:
      return {...state, loaded: true};
    case ASYNC_END:
      return {...state, loaded: false};
    case PAGES_INCREMENT:
      return {...state, page: state.page + 1};
    case PHOTO_LOAD:
      return {...state, current: action.payload};
    case PHOTO_UNLOAD:
      return {...state, current: null};
    default:
      return state;
  }
};
