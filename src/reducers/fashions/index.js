import {
    GET_FASHION,
    UPLOAD_FASHION,
    ADD_FASHION,
    GET_DETAIL_FASHION,
    UPDATE_FASHION,
    DELETE_FASHION
} from "../../actions/FashionsAction.js";

const initialState = {
    getFashionLoading: false,
    getFashionResult: false,
    getFashionError: false,

    uploadFashionLoading: false,
    uploadFashionResult: false,
    uploadFashionError: false,

    addFashionLoading: false,
    addFashionResult: false,
    addFashionError: false,

    getDetailFashionLoading: false,
    getDetailFashionResult: false,
    getDetailFashionError: false,

    updateFashionLoading: false,
    updateFashionResult: false,
    updateFashionError: false,

    deleteFashionLoading: false,
    deleteFashionResult: false,
    deleteFashionError: false,

};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_FASHION:
            return {
                ...state, //jika ada state lain
                getFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                getFashionResult: action.payload.data,
                getFashionError: action.payload.errorMessage,
            };

        case UPLOAD_FASHION:
            return {
                ...state, //jika ada state lain
                uploadFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                uploadFashionResult: action.payload.data,
                uploadFashionError: action.payload.errorMessage,
            };

        case ADD_FASHION:
            return {
                ...state, //jika ada state lain
                addFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                addFashionResult: action.payload.data,
                addFashionError: action.payload.errorMessage,
            };

        case GET_DETAIL_FASHION:
            return {
                ...state, //jika ada state lain
                getDetailFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                getDetailFashionResult: action.payload.data,
                getDetailFashionError: action.payload.errorMessage,
            };

        case UPDATE_FASHION:
            return {
                ...state, //jika ada state lain
                updateFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                updateFashionResult: action.payload.data,
                updateFashionError: action.payload.errorMessage,
            };

        case DELETE_FASHION:
            return {
                ...state, //jika ada state lain
                deleteFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                deleteFashionResult: action.payload.data,
                deleteFashionError: action.payload.errorMessage,
            };


        default:
            return state;
    }
}
