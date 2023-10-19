import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { numberWithCommas } from 'utils';

export default class Orderw extends Component {
    render() {
        const { pesanans } = this.props
        return (
            <div>
                {Object.keys(pesanans).map((key, index) => {
                    return (
                        <Row key={key}>
                            <Col md={2}>
                                <img
                                    src={pesanans[key].product.gambar[0]}
                                    alt={pesanans[key].product.nama[0]}
                                    width={100}
                                />
                            </Col>

                            <Col md={5}>
                                <p>{pesanans[key].product.nama[0]}</p>
                                <p>Rp. {numberWithCommas(pesanans[key].product.harga)}</p>
                            </Col>

                            <Col md={5}>
                                <p>Order {pesanans[key].jumlahPesan}</p>
                                <p>Total Price Rp. {numberWithCommas(pesanans[key].totalHarga)}</p>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        );
    }
}

//md totalnya harus 12
