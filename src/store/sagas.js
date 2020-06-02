import {
  call,
  put,
  fork,
  all,
  takeEvery,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  PHOTOS_HANDLER,
  PHOTOS_SWAP_HANDLER,
  PHOTOS_LOAD,
  ASYNC_START,
  ASYNC_END,
  PAGES_INCREMENT,
  PHOTOS_SWAP,
  PHOTO_LOAD_HANDLER,
  PHOTO_LOAD,
} from './actions';
import agent from './agent';

function* loadPhotos(action) {
  try {
    yield put({type: ASYNC_START});
    let photos = yield call(agent.Unsplash.photos);
    yield put({
      type: PHOTOS_LOAD,
      payload: photos.map(item => ({
        id: item.id,
        author: item.user.name,
        title: item.description,
        small: item.urls.small,
        full: item.urls.full,
      })),
    });
    yield put({type: ASYNC_END});
  } catch (error) {
    yield put({type: ASYNC_END});
    console.log(error);
  }
}

function* swapPhoto(action) {
  try {
    yield put({type: PAGES_INCREMENT});
    let state = yield select(s => s.photos);
    let photos = yield call(agent.Unsplash.photos, state.page);
    yield put({
      type: PHOTOS_SWAP,
      payload: photos.map(item => ({
        id: item.id,
        author: item.user.name,
        title: item.description,
        small: item.urls.small,
        full: item.urls.full,
      })),
    });
  } catch (error) {
    console.log(error);
  }
}

function* loadPhoto(action) {
  try {
    yield put({type: ASYNC_END});
    let photo = yield call(agent.Unsplash.photo, action.payload);
    yield put({
      type: PHOTO_LOAD,
      payload: {
        id: action.payload,
        full: photo.urls.full,
        description: photo.description,
        author: photo.user.name,
      },
    });
    yield put({type: ASYNC_END});
  } catch (error) {
    console.log(error);
    yield put({type: ASYNC_END});
  }
}

function* photosSaga() {
  yield takeLatest(PHOTOS_HANDLER, loadPhotos);
}

function* photosSwapSaga() {
  yield takeLatest(PHOTOS_SWAP_HANDLER, swapPhoto);
}

function* photoSaga() {
  yield takeLatest(PHOTO_LOAD_HANDLER, loadPhoto);
}

function* rootSaga() {
  yield fork(photosSaga);
  yield fork(photosSwapSaga);
  yield fork(photoSaga);
}

export default rootSaga;
