import FIREBASE from "../config/FIREBASE";
import { dispatchLoading, dispatchResult, dispatchError } from "../utils";

export const GET_CATEGORY = "GET_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_DETAIL_CATEGORY = "GET_DETAIL_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY"

export const getCategory = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_CATEGORY);

        FIREBASE.database()
            .ref("category")
            .once("value", (querySnapshot) => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_CATEGORY, data);
            })

            .catch((error) => {
                dispatchError(dispatch, GET_CATEGORY, error);

                alert(error);
            });
    };
};

export const addCategory = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, ADD_CATEGORY);

        //upload ke storage, mendeteksi akan di upload kemana
        var uploadTask = FIREBASE.storage()
            .ref("Category")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

        uploadTask.on(
            "state_changed",
            function (snapshot) {
                console.log(snapshot);
            },
            function (error) {
                // Handle unsuccessful uploads
                console.log(error);
            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    //jika berhasil
                    const newData = {
                        namaCategory: data.namaCategory,
                        image: downloadURL,
                    };

                    FIREBASE.database()
                        .ref("category")
                        .push(newData) //tambah gambar
                        .then((response) => {
                            dispatchResult(dispatch, ADD_CATEGORY, response ? response : []);
                        })
                        .catch((error) => {
                            dispatchError(dispatch, ADD_CATEGORY, error);

                            alert(error);
                        });
                });
            }
        );
    };
};

export const getDetailCategory = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_DETAIL_CATEGORY);

        FIREBASE.database()
            .ref("category/" + id)
            .once("value", (querySnapshot) => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_DETAIL_CATEGORY, data);
            })

            .catch((error) => {
                dispatchError(dispatch, GET_DETAIL_CATEGORY, error);

                alert(error);
            });
    };
};

export const updateCategory = (data) => {
    //data yang dikirimnkan berasal dari EditCategory, yang berisi nama dll
    return (dispatch) => {
        dispatchLoading(dispatch, UPDATE_CATEGORY);

        //cek gambar apakah diganri atau tidak
        if (data.imageToDB) {
            //ganti (hapus gambar yang lama dari firebase storage)
            // Create a reference to the file to delete
            var desertRef = FIREBASE.storage().refFromURL(data.oldImage); //make refFromURL, karena data yang diambil dari URL (DATA YANG DIPUNYA)

            // Delete the file
            desertRef
                .delete()
                .then(function () {
                    // File deleted successfully
                    //upload gambar yang baru
                    var uploadTask = FIREBASE.storage()
                        .ref("Category")
                        .child(data.imageToDB.name)
                        .put(data.imageToDB);

                    uploadTask.on(
                        "state_changed",
                        function (snapshot) {
                            console.log(snapshot);
                        },
                        function (error) {
                            // Handle unsuccessful uploads
                            console.log(error);
                        },
                        function () {
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then(function (downloadURL) {
                                    //jika berhasil
                                    const newData = {
                                        namaCategory: data.namaCategory,
                                        image: downloadURL,
                                    };

                                    FIREBASE.database()
                                        .ref("category/" + data.id)
                                        .update(newData)
                                        .then((response) => {
                                            dispatchResult(
                                                dispatch,
                                                UPDATE_CATEGORY,
                                                response ? response : []
                                            );
                                        })
                                        .catch((error) => {
                                            dispatchError(dispatch, ADD_CATEGORY, error);

                                            alert(error);
                                        });
                                });
                        }
                    );
                })
                .catch(function (error) {
                    // Uh-oh, an error occurred!
                    dispatchError(dispatch, UPDATE_CATEGORY, error);

                    alert(error);
                });
        } else {
            //tidak diganti
            const newData = {
                namaCategory: data.namaCategory,
                image: data.image,
            };

            FIREBASE.database()
                .ref("category/" + data.id)
                .update(newData)
                .then((response) => {
                    dispatchResult(
                        dispatch,
                        UPDATE_CATEGORY,
                        response ? response : []
                    );
                })
                .catch((error) => {
                    dispatchError(dispatch, ADD_CATEGORY, error);

                    alert(error);
                });
        }
    };
};

export const deleteCategory = (image, id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, DELETE_CATEGORY);

        //delete image from storage
        var desertRef = FIREBASE.storage().refFromURL(image);

        // Delete the file
        desertRef.delete().then(function () {
            // File deleted successfully
            //hapus juga data yang ada di realtime database
            FIREBASE.database()
                .ref('category/' + id)
                .remove()
                .then(() => {
                    dispatchResult(dispatch, DELETE_CATEGORY, 'successful category removed')
                })
                .catch((error) => {
                    dispatchError(dispatch, DELETE_CATEGORY, error);

                    alert(error);
                })
        }).catch(function (error) {
            // Uh-oh, an error occurred!
            dispatchError(dispatch, DELETE_CATEGORY, error);

            alert(error);
        });
    }
}
