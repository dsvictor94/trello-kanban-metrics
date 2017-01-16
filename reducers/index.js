import {combineReducers} from 'redux';

import app from './app';
import data from './data';
import scope from './scope';
import metrics from './metrics';

export default combineReducers({app, data, scope, metrics});
