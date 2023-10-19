import { checkLogin } from 'actions/AuthAction';
import { loginUser } from 'actions/AuthAction';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardBody, CardHeader, Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import swal from 'sweetalert';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        };
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSumit = (event) => {
        const { email, password } = this.state
        event.preventDefault()

        if (email && password) {
            //action login
            this.props.dispatch(loginUser(email, password))
        }
        else {
            swal('Failed', 'Sorry email and password must be filled in', 'error')
        }
    }

    componentDidMount() {
        this.props.dispatch(checkLogin(this.props.history))
    }

    componentDidUpdate(prevProps) {
        const { LoginResult, CheckLoginResult } = this.props

        if (LoginResult && prevProps.LoginResult !== LoginResult) {
            this.props.history.push('/admin/dashboard')
        }

        if (CheckLoginResult && prevProps.CheckLoginResult !== CheckLoginResult) {
            this.props.history.push('/admin/dashboard')
        }
    }


    render() {
        const { email, password } = this.state
        const { LoginLoading } = this.props
        return (
            <Row className='justify-content-center mt-5'>
                <Col md={4} className='mt-5'>
                    <CardHeader tag='h4'>Login</CardHeader>
                    <CardBody>
                        <form onSubmit={(event) => this.handleSumit(event)}>
                            <FormGroup>
                                <Label for='email'>Email Address</Label>
                                <Input type='email' name='email' value={email} placeholder='Enter email' onChange={(event) => this.handleChange(event)} />
                            </FormGroup>

                            <FormGroup>
                                <Label for='password'>Password</Label>
                                <Input type='password' name='password' value={password} placeholder='Enter password' onChange={(event) => this.handleChange(event)} />
                            </FormGroup>

                            {LoginLoading ? (<Button color="primary" type="submit" disabled>
                                {" "}
                                <Spinner size='sm' color="light" /> Loading{" "}
                            </Button>) : <Button color='primary' type='submit'>LOGIN</Button>}
                        </form>
                    </CardBody>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    LoginLoading: state.AuthReducer.LoginLoading,
    LoginResult: state.AuthReducer.LoginResult,
    LoginError: state.AuthReducer.LoginError,

    CheckLoginResult: state.AuthReducer.CheckLoginResult,
})

export default connect(mapStateToProps, null)(Login)
