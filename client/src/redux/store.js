import {createStore} from 'redux'
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore( rootReducer, composeWithDevTools())

export default store


// giong context tuy nhien context chi dung cho 1 component con store dung cho nhieu component. neu khong ky dung memo thi se bi re-render toan bo component con
// useContext khi cap nhat state se render lai toan bo component con Redux store thi chi render component co state thay doi

