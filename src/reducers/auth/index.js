import { LOGIN_USER, CHECK_LOGIN, LOG_OUT } from "../../actions/AuthAction";

const initialState = {
    LoginLoading: false,
    LoginResult: false,
    LoginError: false,

    CheckLoginLoading: false,
    CheckLoginResult: false,
    CheckLoginError: false,

    LogOutLoading: false,
    LogOutResult: false,
    LogOutError: false,
};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state, //jika ada state lain
                LoginLoading: action.payload.loading, //didapat dari RakirAction.js
                LoginResult: action.payload.data,
                LoginError: action.payload.errorMessage,
            };

        case CHECK_LOGIN:
            return {
                ...state, //jika ada state lain
                CheckLoginLoading: action.payload.loading, //didapat dari RakirAction.js
                CheckLoginResult: action.payload.data,
                CheckLoginError: action.payload.errorMessage,
            };

        case LOG_OUT:
            return {
                ...state, //jika ada state lain
                LogOutLoading: action.payload.loading, //didapat dari RakirAction.js
                LogOutResult: action.payload.data,
                LogOutError: action.payload.errorMessage,
            };

        default:
            return state;
    }
}
