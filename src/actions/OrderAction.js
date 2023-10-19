import FIREBASE from "../config/FIREBASE";
import { dispatchLoading, dispatchResult, dispatchError } from "../utils";

export const GET_ORDER = "GET_ORDER"
export const UPDATE_ORDER = "UPDATE_ORDER"

export const getOrder = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_ORDER);

        FIREBASE.database()
            .ref("historys")
            .once("value", (querySnapshot) => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_ORDER, data);
            })

            .catch((error) => {
                dispatchError(dispatch, GET_ORDER, error);

                alert(error);
            });
    };
};

export const updateOrder = (order_id, transaction_status) => {
    return (dispatch) => {
        dispatchLoading(dispatch, UPDATE_ORDER);

        const status = transaction_status === 'settlement' || transaction_status === 'capture' ? 'moons' : transaction_status;

        FIREBASE.database()
            .ref("historys")
            .child(order_id)
            .update({
                status: status
            })
            .then((response) => {

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, UPDATE_ORDER, response ? response : []);
            })

            .catch((error) => {
                dispatchError(dispatch, UPDATE_ORDER, error);

                alert(error);
            });
    };
};



