import { combineReducers } from 'redux'
import { searchReducer } from './search'
import { detailedReducer } from './detailInfo'
import { catalogReducer } from './catalog'
import { headerDataReducer } from './header'
import { reducer as formReducer } from 'redux-form'
import { authReducer } from './auth'
import { userPageReducer } from './userPage'

export default combineReducers({
    searchRes: searchReducer,
    detailedInfo: detailedReducer,
    catalog: catalogReducer,
    header: headerDataReducer,
    form: formReducer,
    auth: authReducer,
    userPage: userPageReducer
})