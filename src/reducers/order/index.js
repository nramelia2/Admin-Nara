import {
    GET_ORDER,
    UPDATE_ORDER
} from "../../actions/OrderAction.js";

const initialState = {
    getOrderLoading: false,
    getOrderResult: false,
    getOrderError: false,

    updateStatusLoading: false,
    updateStatusResult: false,
    updateStatusError: false,

};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER:
            return {
                ...state, //jika ada state lain
                getOrderLoading: action.payload.loading, //didapat dari RakirAction.js
                getOrderResult: action.payload.data,
                getOrderError: action.payload.errorMessage,
            };

        case UPDATE_ORDER:
            return {
                ...state, //jika ada state lain
                updateStatusLoading: action.payload.loading, //didapat dari RakirAction.js
                updateStatusResult: action.payload.data,
                updateStatusError: action.payload.errorMessage,
            };

        default:
            return state;
    }
}
