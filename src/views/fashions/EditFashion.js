import { getCategory } from "actions/CategorysAction";
import { updateFashion } from "actions/FashionsAction";
import { getDetailFashion } from "actions/FashionsAction";
import { uploadFashion } from "actions/FashionsAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class EditFashion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            image1: DefaultImage,
            image2: DefaultImage,
            imageToDB1: false,
            imageToDB2: false,
            imageOld1: false,
            imageOld2: false,

            nama1: "",
            nama2: "",
            harga: 0,
            berat: 0,
            bahan: "",
            ukurans: [
                "S",
                "M",
                "L",
                "XL",
                "ALL SIZE",
                "BIG",
                "SMALL",
                "36",
                "37",
                "38",
                "39",
                "40",
            ],
            ukuranSelected: [],
            warnas: ["BLUE", "BLUE SKY", "BLUE LIGHT", "CREAM", "BROWN", "WHITE"],
            warnaSelected: [],
            deskripsi: "",
            category: "",
            ready: true,
            editUkuran: false,
            editWarna: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(getCategory());
        this.props.dispatch(getDetailFashion(this.props.match.params.id));
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleCheckSize = (event) => {
        const checked = event.target.checked;
        const value = event.target.value;

        if (checked) {
            //jika user cheklist ukuran
            //isi state array ukuran selected
            this.setState({
                ukuranSelected: [...this.state.ukuranSelected, value],
            });
        } else {
            //jika user manghapus cheklist ukuran
            const ukuranNew = this.state.ukuranSelected
                .filter((ukuran) => ukuran !== value)
                .map((filterUkuran) => {
                    return filterUkuran;
                });
            this.setState({
                ukuranSelected: ukuranNew,
            });
        }
    };

    handleCheckColor = (event) => {
        const checked = event.target.checked;
        const value = event.target.value;

        if (checked) {
            //jika user cheklist warna
            //isi state array warna selected
            this.setState({
                warnaSelected: [...this.state.warnaSelected, value],
            });
        } else {
            //jika user manghapus cheklist warna
            const warnaNew = this.state.warnaSelected
                .filter((warna) => warna !== value)
                .map((filterWarna) => {
                    return filterWarna;
                });
            this.setState({
                warnaSelected: warnaNew,
            });
        }
    };

    handleImage = (event, imageToDB) => {
        console.log("Event : ", event.target.files);
        if (event.target.files && event.target.files[0]) {
            const gambar = event.target.files[0];
            this.setState({
                [event.target.name]: URL.createObjectURL(gambar),
            });

            this.props.dispatch(uploadFashion(gambar, imageToDB));
        }
    };

    componentDidUpdate(prevProps) {
        const { uploadFashionResult, updateFashionResult, getDetailFashionResult } =
            this.props;

        if (
            uploadFashionResult &&
            prevProps.uploadFashionResult !== uploadFashionResult
        ) {
            this.setState({
                //mengganti isian image to db
                [uploadFashionResult.imageToDB]: uploadFashionResult.image,
            });
            swal("Succes", "Image successfully uploaded.", "success");
        }

        if (
            updateFashionResult &&
            prevProps.updateFashionResult !== updateFashionResult
        ) {
            swal("Succes", updateFashionResult, "success");
            this.props.history.push("/admin/fashions");
        }

        if (
            getDetailFashionResult &&
            prevProps.getDetailFashionResult !== getDetailFashionResult
        ) {
            this.setState({
                image1: getDetailFashionResult.gambar[0],
                image2: getDetailFashionResult.gambar[1],
                imageOld1: getDetailFashionResult.gambar[0],
                imageOld2: getDetailFashionResult.gambar[1],
                nama1: getDetailFashionResult.nama[0],
                nama2: getDetailFashionResult.nama[1],
                harga: getDetailFashionResult.harga,
                berat: getDetailFashionResult.berat,
                bahan: getDetailFashionResult.bahan,
                ukuranSelected: getDetailFashionResult.ukuran,
                warnaSelected: getDetailFashionResult.warna,
                deskripsi: getDetailFashionResult.deskripsi,
                category: getDetailFashionResult.category,
                ready: getDetailFashionResult.ready,
            });
        }
    }

    handleSubmit = (event) => {
        const {
            nama1,
            nama2,
            harga,
            berat,
            bahan,
            ukuranSelected,
            warnaSelected,
            deskripsi,
            category,
        } = this.state;

        event.preventDefault(); //agar tidak loading

        if (
            nama1 &&
            nama2 &&
            category &&
            harga &&
            berat &&
            bahan &&
            ukuranSelected &&
            warnaSelected &&
            deskripsi
        ) {
            //imagenya dihapus karena tidak wajib upload image
            //action
            this.props.dispatch(updateFashion(this.state));
        } else {
            swal("Failed", "Sorry all forms must be filled out.", "error");
        }
    };

    //mengganti ganti ukuran menjadi true
    editUkuran = () => {
        this.setState({
            editUkuran: true,
            ukuranSelected: [], //agar kosong
        });
    };

    editWarna = () => {
        this.setState({
            editWarna: true,
            warnaSelected: [],
        });
    };

    render() {
        const {
            image1,
            image2,
            imageToDB1,
            imageToDB2,
            nama1,
            nama2,
            harga,
            berat,
            bahan,
            ukurans,
            warnas,
            deskripsi,
            category,
            ready,
            ukuranSelected,
            warnaSelected,
            editUkuran,
            editWarna,
            imageOld1,
            imageOld2,
        } = this.state;

        const { getCategoryResult, updateFashionLoading } = this.props;

        return (
            <div className="content">
                <Row>
                    <Col>
                        <Link to="/admin/fashions" className="btn btn-primary">
                            Back
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader tag="h4">Edit Fashion</CardHeader>

                            <CardBody>
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col>
                                                    <img
                                                        src={image1}
                                                        alt="Front fashion"
                                                    />
                                                    <FormGroup>
                                                        <label>Front fashion photo</label>
                                                        <Input
                                                            type="file"
                                                            name="image1"
                                                            onChange={(event) =>
                                                                this.handleImage(event, "imageToDB1")
                                                            }
                                                        />
                                                    </FormGroup>

                                                    {image1 !== imageOld1 ? (
                                                        //selesai upload atau proses upload
                                                        imageToDB1 ? (
                                                            <p>
                                                                <i className="nc-icon nc-check-2"></i>Upload
                                                                successfully
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                <i className="nc-icon nc-user-run"></i>Process
                                                                upload.
                                                            </p>
                                                        )
                                                    ) : (
                                                        //belum upload
                                                        <p>
                                                            <i className="nc-icon nc-cloud-upload-94"></i>Not
                                                            uploaded yet.
                                                        </p>
                                                    )}
                                                </Col>

                                                <Col>
                                                    <img
                                                        src={image2}
                                                        alt="Back fashion"
                                                    />
                                                    <FormGroup>
                                                        <label>Back fashion photo</label>
                                                        <Input
                                                            type="file"
                                                            name="image2"
                                                            onChange={(event) =>
                                                                this.handleImage(event, "imageToDB2")
                                                            }
                                                        />
                                                    </FormGroup>
                                                    {image2 !== imageOld2 ? (
                                                        //selesai upload atau proses upload
                                                        imageToDB2 ? (
                                                            <p>
                                                                <i className="nc-icon nc-check-2"></i>Upload
                                                                successfully
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                <i className="nc-icon nc-user-run"></i>Process
                                                                upload.
                                                            </p>
                                                        )
                                                    ) : (
                                                        //belum upload
                                                        <p>
                                                            <i className="nc-icon nc-cloud-upload-94"></i>Not
                                                            uploaded yet.
                                                        </p>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={6}>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label>Name Fashions</label>
                                                        <Input
                                                            type="text"
                                                            value={nama1}
                                                            name="nama1"
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col>
                                                    <FormGroup>
                                                        <label>
                                                            Name Fashions (with use price product)
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            value={nama2}
                                                            name="nama2"
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <label>Choose Fashions</label>
                                                        <Input
                                                            type="select"
                                                            name="category"
                                                            value={category}
                                                            onChange={(event) => this.handleChange(event)}
                                                        >
                                                            <option value="">--Choose--</option>
                                                            {Object.keys(getCategoryResult).map((key) => (
                                                                <option value={key} key={key}>
                                                                    {getCategoryResult[key].namaCategory}
                                                                </option>
                                                            ))}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>

                                                <Col md={6}>
                                                    <FormGroup>
                                                        <label>Price (Rp. )</label>
                                                        <Input
                                                            type="number"
                                                            value={harga}
                                                            name="harga"
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <label>Weight (kg)</label>
                                                        <Input
                                                            type="number"
                                                            value={berat}
                                                            name="berat"
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={6}>
                                                    <FormGroup>
                                                        <label>Materials</label>
                                                        <Input
                                                            type="text"
                                                            value={bahan}
                                                            name="bahan"
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <label>
                                                        Size available now (
                                                        {ukuranSelected.map((item, index) => (
                                                            <strong key={index}>{item} </strong>
                                                        ))}
                                                        )
                                                    </label>
                                                    {editUkuran ? (
                                                        <>
                                                            <FormGroup check>
                                                                {ukurans.map((ukuran, index) => (
                                                                    <Label key={index} check className="mr-3">
                                                                        <Input
                                                                            type="checkbox"
                                                                            value={ukuran}
                                                                            onChange={(event) =>
                                                                                this.handleCheckSize(event)
                                                                            }
                                                                        />
                                                                        {ukuran}
                                                                        <span className="form-check-sign">
                                                                            <span className="check"></span>
                                                                        </span>
                                                                    </Label>
                                                                ))}
                                                            </FormGroup>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    this.setState({ editUkuran: false })
                                                                }
                                                            >
                                                                Finished edit size
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            onClick={() => this.editUkuran()}
                                                        >
                                                            Edit Size
                                                        </Button>
                                                    )}
                                                </Col>

                                                <Col md={6}>
                                                    <label>
                                                        Color available now (
                                                        {warnaSelected.map((item, index) => (
                                                            <strong key={index}>{item} </strong>
                                                        ))}
                                                        )
                                                    </label>
                                                    {editWarna ? (
                                                        <>
                                                            <FormGroup check>
                                                                {warnas.map((warna, index) => (
                                                                    <Label key={index} check className="mr-3">
                                                                        <Input
                                                                            type="checkbox"
                                                                            value={warna}
                                                                            onChange={(event) =>
                                                                                this.handleCheckColor(event)
                                                                            }
                                                                        />
                                                                        {warna}
                                                                        <span className="form-check-sign">
                                                                            <span className="check"></span>
                                                                        </span>
                                                                    </Label>
                                                                ))}
                                                            </FormGroup>
                                                            <Button
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    this.setState({ editWarna: false })
                                                                }
                                                            >
                                                                Finished edit color
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            onClick={() => this.editWarna()}
                                                        >
                                                            Edit Color
                                                        </Button>
                                                    )}
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label>Description</label>
                                                        <Input
                                                            type="text"
                                                            value={deskripsi}
                                                            name="deskripsi"
                                                            onChange={(event) => this.handleChange(event)}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={6}>
                                                    <FormGroup>
                                                        <label>Ready</label>
                                                        <Input
                                                            type="select"
                                                            name="ready"
                                                            value={ready}
                                                            onChange={(event) => this.handleChange(event)}
                                                        >
                                                            <option value={true}>Exist</option>
                                                            <option value={false}>Empty</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            {updateFashionLoading ? (
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    className="float-right"
                                                    disabled
                                                >
                                                    <Spinner size="sm" color="light" />
                                                    Loading
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    className="float-right"
                                                >
                                                    SUBMIT
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    getCategoryLoading: state.CategorysReducer.getCategoryLoading,
    getCategoryResult: state.CategorysReducer.getCategoryResult,
    getCategoryError: state.CategorysReducer.getCategoryError,

    uploadFashionLoading: state.FashionsReducer.uploadFashionLoading,
    uploadFashionResult: state.FashionsReducer.uploadFashionResult,
    uploadFashionError: state.FashionsReducer.uploadFashionError,

    getDetailFashionLoading: state.FashionsReducer.getDetailFashionLoading,
    getDetailFashionResult: state.FashionsReducer.getDetailFashionResult,
    getDetailFashionError: state.FashionsReducer.getDetailFashionError,

    updateFashionLoading: state.FashionsReducer.updateFashionLoading,
    updateFashionResult: state.FashionsReducer.updateFashionResult,
    updateFashionError: state.FashionsReducer.updateFashionError,
});

export default connect(mapStateToProps, null)(EditFashion);

//mapping mengambil data dari real time data base
