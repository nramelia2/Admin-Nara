import {
    GET_CATEGORY,
    ADD_CATEGORY,
    GET_DETAIL_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
} from "../../actions/CategorysAction";

const initialState = {
    getCategoryLoading: false,
    getCategoryResult: false,
    getCategoryError: false,

    addCategoryLoading: false,
    addCategoryResult: false,
    addCategoryError: false,

    getDetailCategoryLoading: false,
    getDetailCategoryResult: false,
    getDetailCategoryError: false,

    updateCategoryLoading: false,
    updateCategoryResult: false,
    updateCategoryError: false,

    deleteCategoryLoading: false,
    deleteCategoryResult: false,
    deleteCategoryError: false,
};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state, //jika ada state lain
                getCategoryLoading: action.payload.loading, //didapat dari RakirAction.js
                getCategoryResult: action.payload.data,
                getCategoryError: action.payload.errorMessage,
            };

        case ADD_CATEGORY:
            return {
                ...state, //jika ada state lain
                addCategoryLoading: action.payload.loading, //didapat dari RakirAction.js
                addCategoryResult: action.payload.data,
                addCategoryError: action.payload.errorMessage,
            };

        case GET_DETAIL_CATEGORY:
            return {
                ...state, //jika ada state lain
                getDetailCategoryLoading: action.payload.loading, //didapat dari RakirAction.js
                getDetailCategoryResult: action.payload.data,
                getDetailCategoryError: action.payload.errorMessage,
            };

        case UPDATE_CATEGORY:
            return {
                ...state, //jika ada state lain
                updateCategoryLoading: action.payload.loading, //didapat dari RakirAction.js
                updateCategoryResult: action.payload.data,
                updateCategoryError: action.payload.errorMessage,
            };

        case DELETE_CATEGORY:
            return {
                ...state, //jika ada state lain
                deleteCategoryLoading: action.payload.loading, //didapat dari RakirAction.js
                deleteCategoryResult: action.payload.data,
                deleteCategoryError: action.payload.errorMessage,
            };
        default:
            return state;
    }
}
