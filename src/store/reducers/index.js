import { combineReducers } from 'redux'
import { searchReducer } from './search'
import { detailedReducer } from './detailInfo'

export default combineReducers({
    searchRes: searchReducer,
    detailedInfo: detailedReducer
})