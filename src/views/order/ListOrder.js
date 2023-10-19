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
    Spinner,
} from "reactstrap"; //gabungan boostrap dan react js
import { getOrder } from "actions/OrderAction";
import { numberWithCommas } from "utils";
import { Orders } from "components";

class ListOrder extends Component {
    componentDidMount() {
        this.props.dispatch(getOrder())
    }

    render() {
        const { getOrderLoading, getOrderResult, getOrderError } = this.props
        console.log("Data : ", getOrderResult);
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Orders</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Date, Order ID and User</th>
                                            <th>Order</th>
                                            <th>Status</th>
                                            <th>Total Price</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    {getOrderResult ? (
                                        //data ada, mendaptkan API
                                        Object.keys(getOrderResult).map((key) => (
                                            <tr key={key}>
                                                <td>
                                                    <p>{getOrderResult[key].tanggal}</p>
                                                    <p>({getOrderResult[key].order_id})</p>
                                                    <p>({getOrderResult[key].user})</p>
                                                </td>
                                                <td>
                                                    <Orders pesanans={getOrderResult[key].pesanans} />
                                                </td>
                                                <td>{getOrderResult[key].status}</td>
                                                <td >
                                                    <p>Total Price Rp. {numberWithCommas(getOrderResult[key].totalHarga)}</p>

                                                    <p>Total Ongkir Rp. {numberWithCommas(getOrderResult[key].ongkir)}</p>

                                                    <p>
                                                        <strong>Total Rp. {numberWithCommas(getOrderResult[key].totalHarga + getOrderResult[key].ongkir)}</strong>
                                                    </p>
                                                </td>

                                                <td>
                                                    <a href={getOrderResult[key].url} className="btn btn-primary">
                                                        <i className="nc-icon nc-money-coins"></i>Midtrans
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : getOrderLoading ? (
                                        //spinner loading/ icon loading
                                        <tr>
                                            <td colSpan="6" align="center">
                                                <Spinner color="primary" />
                                            </td>
                                        </tr>
                                    ) : getOrderError ? (
                                        //tampilkan error
                                        <tr>
                                            <td colSpan="6" align="center">
                                                {getOrderError}
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
    getOrderLoading: state.OrderReducer.getOrderLoading,
    getOrderResult: state.OrderReducer.getOrderResult,
    getOrderError: state.OrderReducer.getOrderError,
});

export default connect(mapStateToProps, null)(ListOrder);

//colSpan - agar ditengah sesuai jumlah table, jika table 6 maka colSpan harus bernilai 6 agar bisa ditengah loadingnya