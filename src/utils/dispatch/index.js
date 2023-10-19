export const dispatchLoading = (dispatch, type) => {
    return dispatch({
        type: type,
        payload: {
            loading: true,
            data: false,
            errorMessage: false
        }
    })
}

export const dispatchResult = (dispatch, type, result) => {
    return dispatch({
        type: type,
        payload: {
            loading: false,
            data: result,
            errorMessage: false
        }
    })
}

export const dispatchError = (dispatch, type, error) => {
    return dispatch({
        type: type,
        payload: {
            loading: false,
            data: false,
            errorMessage: error
        }
    })
}