import {combineReducers} from 'redux';
import photos from './reducers/photos';

//регистрация редьюсеров
const rootReducer = combineReducers({
  photos,
});

export default rootReducer;
