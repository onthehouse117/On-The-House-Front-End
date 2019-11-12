import { combineReducers } from 'redux';

export {
    loadUser,
    register,
    login,
    logout,
    verify,
    tokenConfig
} from './authActions'

export {
    returnErrors,
    clearErrors
} from './errorActions'

export {
    UpdatePostData,
    createNewPost
} from './postActions'