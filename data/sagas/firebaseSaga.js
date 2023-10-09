import {initializeApp} from 'firebase/app'
import {put, takeEvery} from 'redux-saga/effects'
import {FirebaseActions} from '../actions/firebaseAction'
import {setFirebaseApp} from '../reducers/firebaseReducer'

function* performInit () {}

export default function* firebaseSaga () {
  yield takeEvery(FirebaseActions.INIT, performInit)
}
