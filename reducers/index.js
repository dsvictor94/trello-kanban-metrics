import {combineReducers} from 'redux';

import app from './app';
import data from './data';
import scope from './scope';

export default combineReducers({app, data, scope});
