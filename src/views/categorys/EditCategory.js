import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Col,
    Row,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Input,
    Button,
    Spinner,
} from "reactstrap"; //gabungan boostrap dan react js
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/img/default-image.jpg";
import swal from "sweetalert";
import { getDetailCategory } from "actions/CategorysAction";
import { updateCategory } from "actions/CategorysAction";

class EditCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: DefaultImage, //hanya menampilkan view
            imageToDB: false, //menampilkan data di firebase, akan bernilai true jika admin mengedit gambar yang baru
            namaCategory: "",
            id: this.props.match.params.id, //untuk dikirim ke action untuk mengganti yang lama
            oldImage: DefaultImage,
        };
    }

    handleSubmit = (event) => {
        const { namaCategory } = this.state;
        event.preventDefault()
        if (namaCategory) {
            //proses akan lanjut ke firebase
            this.props.dispatch(updateCategory(this.state))
        }
        else {
            //alert
            swal("Failed", "Sorry Name Categorys required", "error")
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleImage = (event) => {
        console.log("Event : ", event.target.files);
        if (event.target.files && event.target.files[0]) {
            const gambar = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(gambar),
                imageToDB: gambar,
            });
        }
    };

    componentDidUpdate(prevProps) {
        const { updateCategoryResult, getDetailCategoryResult } = this.props

        if (updateCategoryResult && prevProps.updateCategoryResult !== updateCategoryResult) {
            swal("Success", "Successful categories are update.")
            this.props.history.push('/admin/categorys')
        }

        if (getDetailCategory && prevProps.getDetailCategoryResult !== getDetailCategoryResult) {
            this.setState({
                image: getDetailCategoryResult.image,
                namaCategory: getDetailCategoryResult.namaCategory,
                oldImage: getDetailCategoryResult.image,
            })
        }
    }

    componentDidMount() {
        this.props.dispatch(getDetailCategory(this.props.match.params.id))
    }

    render() {
        const { image, namaCategory } = this.state;
        const { updateCategoryLoading } = this.props
        return (
            <div className="content">
                <Row>
                    <Col>
                        <Link to={"/admin/categorys"} className="btn btn-primary">
                            Back
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Edit Categorys</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <img src={image} width={200} alt="Logo Categorys" />
                                    </Col>
                                </Row>
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label>Logo Categorys</label>
                                                <Input
                                                    type="file"
                                                    onChange={(event) => this.handleImage(event)}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <label>Name Categorys</label>
                                                <Input
                                                    type="text"
                                                    value={namaCategory}
                                                    name="namaCategory"
                                                    onChange={(event) => this.handleChange(event)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            {updateCategoryLoading ? (<Button color="primary" type="submit" disabled>
                                                {" "}
                                                <Spinner size='sm' color="light" /> Loading{" "}
                                            </Button>) : (
                                                <Button color="primary" type="submit">
                                                    {" "}
                                                    Submit{" "}
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
    updateCategoryLoading: state.CategorysReducer.updateCategoryLoading,
    updateCategoryResult: state.CategorysReducer.updateCategoryResult,
    updateCategoryError: state.CategorysReducer.updateCategoryError,

    getDetailCategoryLoading: state.CategorysReducer.getDetailCategoryLoading,
    getDetailCategoryResult: state.CategorysReducer.getDetailCategoryResult,
    getDetailCategoryError: state.CategorysReducer.getDetailCategoryError,
});

export default connect(mapStateToProps, null)(EditCategory);
