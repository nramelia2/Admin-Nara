import FIREBASE from "../config/FIREBASE";
import { dispatchLoading, dispatchResult, dispatchError } from "../utils";

export const GET_FASHION = "GET_FASHION"
export const UPLOAD_FASHION = 'UPLOAD_FASHION'
export const ADD_FASHION = 'ADD_FASHION'
export const GET_DETAIL_FASHION = 'GET_DETAIL_FASHION'
export const UPDATE_FASHION = 'UPDATE_FASHION'
export const DELETE_FASHION = 'DELETE_FASHION'

export const getFashion = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_FASHION);

        FIREBASE.database()
            .ref("fashion")
            .once("value", (querySnapshot) => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_FASHION, data);
            })

            .catch((error) => {
                dispatchError(dispatch, GET_FASHION, error);

                alert(error);
            });
    };
};

export const uploadFashion = (gambar, imageToDB) => {
    return (dispatch) => {
        dispatchLoading(dispatch, UPLOAD_FASHION)

        //upload ke storage, mendeteksi akan di upload kemana
        var uploadTask = FIREBASE.storage()
            .ref("Fashion")
            .child(gambar.name)
            .put(gambar);

        uploadTask.on(
            "state_changed",
            function (snapshot) {
                console.log(snapshot);
            },
            function (error) {
                // Handle unsuccessful uploads
                dispatchError(dispatch, UPLOAD_FASHION, error);
            },
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    //jika berhasil
                    const newData = {
                        image: downloadURL,
                        imageToDB: imageToDB
                    };
                    dispatchResult(dispatch, UPLOAD_FASHION, newData)
                });
            }
        );
    }
}

export const fashionAdd = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, ADD_FASHION)

        const newData = {
            gambar: [data.imageToDB1, data.imageToDB2],
            nama: [data.nama1, data.nama2],
            harga: data.harga,
            berat: data.berat,
            bahan: data.bahan,
            ready: data.ready,
            ukuran: data.ukuranSelected,
            warna: data.warnaSelected,
            category: data.category,
            deskripsi: data.deskripsi
        }
        FIREBASE.database()
            .ref('fashion')
            .push(newData)
            .then((response) => {
                dispatchResult(dispatch, ADD_FASHION, response)
            })
            .catch((error) => {
                dispatchError(dispatch, ADD_FASHION, error);

                alert(error);
            })
    }
}

export const getDetailFashion = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_DETAIL_FASHION);

        FIREBASE.database()
            .ref("fashion/" + id)
            .once("value", (querySnapshot) => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_DETAIL_FASHION, data);
            })

            .catch((error) => {
                dispatchError(dispatch, GET_DETAIL_FASHION, error);

                alert(error);
            });
    };
};

export const updateFashion = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, UPDATE_FASHION)

        const newData = {
            gambar: [data.imageToDB1 ? data.imageToDB1 : data.imageOld1, data.imageToDB2 ? data.imageToDB2 : data.imageOld2],
            nama: [data.nama1, data.nama2],
            harga: data.harga,
            berat: data.berat,
            bahan: data.bahan,
            ready: data.ready,
            ukuran: data.ukuranSelected,
            warna: data.warnaSelected,
            category: data.category,
            deskripsi: data.deskripsi
        }
        FIREBASE.database()
            .ref('fashion/' + data.id)
            .update(newData)
            .then((response) => {
                if (data.imageToDB1) {
                    var desertRef = FIREBASE.storage().refFromURL(data.imageOld1);
                    desertRef
                        .delete()
                        .catch(function (error) {
                            dispatchError(dispatch, UPDATE_FASHION, error);
                        })
                }

                if (data.imageToDB2) {
                    var desertRef2 = FIREBASE.storage().refFromURL(data.imageOld2);
                    desertRef2
                        .delete()
                        .catch(function (error) {
                            dispatchError(dispatch, UPDATE_FASHION, error);
                        })
                }


                dispatchResult(dispatch, UPDATE_FASHION, 'Update Fashion Success')
            })
            .catch((error) => {
                dispatchError(dispatch, UPDATE_FASHION, error);

                alert(error);
            })
    }
}

export const deleteFashion = (images, id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, DELETE_FASHION)

        var desertRef = FIREBASE.storage().refFromURL(images[0]);
        desertRef
            .delete()
            .then(function () {
                var desertRef2 = FIREBASE.storage().refFromURL(images[1]);

                desertRef2
                    .delete()
                    .then(function () {
                        //hapus realtime database
                        FIREBASE.database()
                            .ref('fashion/' + id).remove()
                            .then(function () {
                                dispatchResult(dispatch, DELETE_FASHION, 'Fashion was removed.')
                            })
                            .catch(function (error) {
                                dispatchError(dispatch, DELETE_FASHION, error);
                            })
                    })
                    .catch(function (error) {
                        dispatchError(dispatch, DELETE_FASHION, error);
                    })

            })
            .catch(function (error) {
                dispatchError(dispatch, DELETE_FASHION, error);
            })
    }
}


