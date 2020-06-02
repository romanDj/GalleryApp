import {
  PHOTOS_HANDLER,
  PHOTOS_SWAP_HANDLER,
  PHOTO_LOAD_HANDLER,
  PHOTO_UNLOAD,
} from '../actions';

export function load() {
  return {type: PHOTOS_HANDLER};
}

export function swap() {
  return {type: PHOTOS_SWAP_HANDLER};
}

export function loadById(id) {
  return {type: PHOTO_LOAD_HANDLER, payload: id};
}
export function unload() {
  return {type: PHOTO_UNLOAD};
}
