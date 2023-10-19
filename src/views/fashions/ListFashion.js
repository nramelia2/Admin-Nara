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
import { deleteFashion, getFashion } from '../../actions/FashionsAction';
import swal from "sweetalert";


class ListFashions extends Component {
    componentDidMount() {
        this.props.dispatch(getFashion())
    }

    componentDidUpdate(prevProps) {
        const { deleteFashionResult } = this.props

        if (deleteFashionResult && prevProps.deleteFashionResult !== deleteFashionResult) {
            swal("Success", deleteFashionResult, "success") //karena sudah ditampilkan di action, maka tinggal deleteCategoryResult
            this.props.dispatch(getFashion())
        }
    }

    removeData = (images, key) => {
        this.props.dispatch(deleteFashion(images, key))
    };

    render() {
        const { getFashionLoading, getFashionResult, getFashionError } = this.props
        console.log("Data : ", getFashionResult);
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Fashions</CardTitle>
                                <Link
                                    to="/admin/fashions/add"
                                    className="btn btn-primary float-right"
                                >
                                    Add Fashion
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Photo</th>
                                            <th>Name Fashion</th>
                                            <th>Price</th>
                                            <th>Weight</th>
                                            <th>Material</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    {getFashionResult ? (
                                        //data ada, mendaptkan API
                                        Object.keys(getFashionResult).map((key) => (
                                            <tr key={key}>
                                                <td>
                                                    <img
                                                        src={getFashionResult[key].gambar[0]}
                                                        alt={getFashionResult[key].nama[0]}
                                                        width={100}
                                                    />
                                                </td>

                                                <td>{getFashionResult[key].nama[0]}</td>
                                                <td>Rp. {getFashionResult[key].harga}</td>
                                                <td>{getFashionResult[key].berat} kg</td>
                                                <td>{getFashionResult[key].bahan}</td>

                                                <td>
                                                    <Link
                                                        className="btn btn-primary"
                                                        to={"/admin/Fashions/edit/" + key}
                                                    >
                                                        <i className="nc-icon nc-ruler-pencil"></i>
                                                        Edit
                                                    </Link>

                                                    <Button
                                                        color="danger"
                                                        className="ml-2"
                                                        onClick={() => this.removeData(getFashionResult[key].gambar, key)}
                                                    >
                                                        <i className="nc-icon nc-basket"></i>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : getFashionLoading ? (
                                        //spinner loading/ icon loading
                                        <tr>
                                            <td colSpan="6" align="center">
                                                <Spinner color="primary" />
                                            </td>
                                        </tr>
                                    ) : getFashionError ? (
                                        //tampilkan error
                                        <tr>
                                            <td colSpan="6" align="center">
                                                {getFashionError}
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="6" align="center">
                                                Blank Data
                                            </td>
                                        </tr>
                                    )}
                                    <tbody>

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
    getFashionLoading: state.FashionsReducer.getFashionLoading,
    getFashionResult: state.FashionsReducer.getFashionResult,
    getFashionError: state.FashionsReducer.getFashionError,

    deleteFashionLoading: state.FashionsReducer.deleteFashionLoading,
    deleteFashionResult: state.FashionsReducer.deleteFashionResult,
    deleteFashionError: state.FashionsReducer.deleteFashionError,
});

export default connect(mapStateToProps, null)(ListFashions);

//colSpan - agar ditengah sesuai jumlah table, jika table 6 maka colSpan harus bernilai 6 agar bisa ditengah loadingnya