import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Logo from '../../assets/img/failedanderror.png';

export default class Unfinish extends Component {
    render() {

        let seacrh = window.location.search
        let params = new URLSearchParams(seacrh) // mengambil url params

        const order_id = params.get('order_id')
        const transaction_status = params.get('transaction_status')

        return (
            <Row className='justify-content-center mt-5'>
                <Col md={4} className='mt-5'>
                    <img src={Logo} className="rounded mx-auto d-block" alt="logo" />
                    <Card>
                        <CardHeader tag='h4' align='center'>Sorry your transaction has not been completed, please complete it on the history page</CardHeader>
                        <CardBody className='text-center'>

                            <p>ORDER ID {order_id}</p>
                            <p>STATUS TRANSACTION {transaction_status}</p>

                            <Button type='submit'>
                                Next
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
