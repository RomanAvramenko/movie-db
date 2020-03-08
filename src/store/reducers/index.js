import { combineReducers } from 'redux'
import { searchReducer } from './search'
import { detailedReducer } from './detailInfo'
import { catalogReducer } from './catalog'
import { headerDataReducer } from './header'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    searchRes: searchReducer,
    detailedInfo: detailedReducer,
    catalog: catalogReducer,
    header: headerDataReducer,
    form: formReducer
})