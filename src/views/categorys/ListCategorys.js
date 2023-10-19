import { getCategory } from "actions/CategorysAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Col,
    Row,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Table,
    Button,
    Spinner,
} from "reactstrap"; //gabungan boostrap dan react js
import { Link } from "react-router-dom";
import { deleteCategory } from "actions/CategorysAction";
import swal from "sweetalert";

class ListCategorys extends Component {
    componentDidMount() {
        this.props.dispatch(getCategory());
    }

    componentDidUpdate(prevProps) {
        const { deleteCategoryResult } = this.props

        if (deleteCategoryResult && prevProps.deleteCategoryResult !== deleteCategoryResult) {
            swal("Success", deleteCategoryResult, "Success") //karena sudah ditampilkan di action, maka tinggal deleteCategoryResult
            this.props.dispatch(getCategory())
        }
    }

    removeData = (image, id) => {
        //kenapa perlu id? karena disini akan menghapus data real timenya, bukan hanya di storage saja
        //akses action
        this.props.dispatch(deleteCategory(image, id))
    };

    render() {
        const { getCategoryResult, getCategoryLoading, getCategoryError } =
            this.props;
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Categorys</CardTitle>
                                <Link
                                    to={"/admin/categorys/add"}
                                    className="btn btn-primary float-right"
                                >
                                    Add Categorys
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="text-primary">
                                        <th>Logo</th>
                                        <th>Categorys</th>
                                        <th>Aksi</th>
                                    </thead>

                                    <tbody>
                                        {getCategoryResult ? (
                                            //data ada, mendaptkan API
                                            Object.keys(getCategoryResult).map((key) => (
                                                <tr key={key}>
                                                    <td>
                                                        <img
                                                            src={getCategoryResult[key].image}
                                                            alt={getCategoryResult[key].namaCategory}
                                                            width={100}
                                                        />
                                                    </td>

                                                    <td>{getCategoryResult[key].namaCategory}</td>

                                                    <td>
                                                        <Link
                                                            className="btn btn-primary"
                                                            to={"/admin/categorys/edit/" + key}
                                                        >
                                                            <i className="nc-icon nc-ruler-pencil"></i>
                                                            Edit
                                                        </Link>

                                                        <Button
                                                            color="danger"
                                                            className="ml-2"
                                                            onClick={() =>
                                                                this.removeData(
                                                                    getCategoryResult[key].image,
                                                                    key
                                                                )
                                                            }
                                                        >
                                                            <i className="nc-icon nc-basket"></i>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : getCategoryLoading ? (
                                            //spinner loading/ icon loading
                                            <tr>
                                                <td colSpan="3" align="center">
                                                    <Spinner color="primary" />
                                                </td>
                                            </tr>
                                        ) : getCategoryError ? (
                                            //tampilkan error
                                            <tr>
                                                <td colSpan="3" align="center">
                                                    {getCategoryError}
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td colSpan="3" align="center">
                                                    Blank Data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
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

    deleteCategoryLoading: state.CategorysReducer.deleteCategoryLoading,
    deleteCategoryResult: state.CategorysReducer.deleteCategoryResult,
    deleteCategoryError: state.CategorysReducer.deleteCategoryError,
});

export default connect(mapStateToProps, null)(ListCategorys);
