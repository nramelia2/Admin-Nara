import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import { updateOrder } from '../../actions/OrderAction';
import Logo from '../../assets/img/success.png';

class Finish extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order_id: '',
            transaction_status: ''
        };
    };

    componentDidMount() {
        let seacrh = window.location.search
        let params = new URLSearchParams(seacrh) // mengambil url params

        const order_id = params.get('order_id')
        const transaction_status = params.get('transaction_status')

        if (order_id) {
            this.setState({
                order_id: order_id,
                transaction_status: transaction_status
            })

            //masuk action update status history
            this.props.dispatch(updateOrder(order_id, transaction_status))
        }
    }

    toHistory = () => {
        window.ReactNativeWebView.postMessage('Done')
    }

    render() {
        const { order_id, transaction_status } = this.state
        const { updateOrderLoading } = this.props
        return (
            <Row className='justify-content-center mt-5'>
                {updateOrderLoading ? (
                    <Spinner color='primary' />
                ) : (
                    <Col md={4} className='mt-5'>
                        <img src={Logo} className="rounded mx-auto d-block" alt="logo" />
                        <Card>
                            <CardHeader tag='h2' align='center'>Congratulations your transaction is complete.</CardHeader>
                            <CardBody className='text-center'>
                                <p>{transaction_status === 'pending' && 'Please complete the transaction if it has not been paid.'}</p>
                                <p>ORDER ID {order_id}</p>
                                <p>STATUS TRANSACTION {transaction_status === 'settlement' || transaction_status === 'capture' ? 'moons' : transaction_status}</p>

                                <Button type='submit' onClick={() => this.toHistory()}>
                                    Next
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    updateOrderLoading: state.OrderReducer.updateOrderLoading
})

export default connect(mapStateToProps, null)(Finish)
