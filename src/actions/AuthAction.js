import swal from "sweetalert";
import FIREBASE from "../config/FIREBASE";
import { dispatchLoading, dispatchResult, dispatchError } from "../utils";

export const LOGIN_USER = 'LOGIN_USER'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOG_OUT = 'LOG_OUT'

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatchLoading(dispatch, LOGIN_USER)

        FIREBASE
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {

                FIREBASE.database()
                    .ref(`users/${res.user.uid}`)
                    .once('value')
                    .then((resDB) => {
                        if (resDB.val()) {
                            if (resDB.val().status === 'admin') {
                                //simpan di local storage
                                window.localStorage.setItem('user', JSON.stringify(resDB.val()))
                                dispatchResult(dispatch, LOGIN_USER, resDB.val())
                            }
                            else {
                                dispatchError(dispatch, LOGIN_USER, 'You are not an admin.')
                                swal('Failed', 'You are not an admin.', 'error')
                            }
                        }
                    })
                    .catch((error) => {
                        dispatchError(dispatch, LOGIN_USER, error)
                        swal('Failed', error, 'error')

                    })
                //Signed in ...

                // ...
            })
            .catch((error) => {
                var errorMessage = error.message

                dispatchError(dispatch, LOGIN_USER, errorMessage)
                swal('Failed', errorMessage, 'error')

            })
    }
}

export const checkLogin = (history) => {
    return (dispatch) => {
        dispatchLoading(dispatch, CHECK_LOGIN)

        if (window.localStorage.getItem('user')) {
            const user = JSON.parse(window.localStorage.getItem('user'))

            FIREBASE.database()
                .ref(`users/${user.uid}`)
                .once('value')
                .then((resDB) => {
                    if (resDB.val()) {
                        if (resDB.val().status === 'admin') {
                            dispatchResult(dispatch, CHECK_LOGIN, resDB.val())
                        }
                        else {
                            dispatchError(dispatch, CHECK_LOGIN, 'You are not an admin.')
                            history.push({ pathname: './login' })
                        }
                    }
                    else {
                        dispatchError(dispatch, CHECK_LOGIN, 'You are not an admin.')
                        history.push({ pathname: './login' })
                    }
                })
                .catch((error) => {
                    dispatchError(dispatch, CHECK_LOGIN, 'error')
                    history.push({ pathname: './login' })
                })
        }
        else {
            dispatchError(dispatch, CHECK_LOGIN, 'Not logged in yet')
            history.push({ pathname: './login' })
        }
    }
}

export const logOutUser = (history) => {
    return (dispatch) => {
        dispatchLoading(dispatch, LOG_OUT)

        FIREBASE.auth()
            .signOut()
            .then((res) => {
                window.localStorage.removeItem('user')
                dispatchResult(dispatch, LOG_OUT, res)
                history.push({ pathname: '/login' })
            })
            .catch((error) => {
                dispatchError(dispatch, LOG_OUT, error.message)
                swal('Failed', error.message, 'error')
            })
    }
}