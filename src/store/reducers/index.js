import { combineReducers } from 'redux'
import { searchReducer } from './search'
import { detailedReducer } from './detailInfo'
import { catalogReducer } from './catalog'

export default combineReducers({
    searchRes: searchReducer,
    detailedInfo: detailedReducer,
    catalog: catalogReducer
})