import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col,Row } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class SignUp extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        localStorage.setItem('userName', values.name);
        localStorage.setItem('userEmail', values.email);
        localStorage.setItem('userPassWord', values.password);
        alert("User Registered now go ahead and Login ! ");
        this.props.history.push('/login');

    }

  render() {

    return (

    <div className="container">

        <div className="row row-content">
        <div className="col-md-2">
            </div>
            <div className="col-12 col-md-8 text-center pb-4">
                <h3 className="pl-5">Sign Up</h3>
            </div>
            <div className="col-md-2">
            </div>
            <div className="col-md-2">
            </div>
            <div className="col-12 col-md-8">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="name" md={2}> Name</Label>
                        <Col md={10}>
                            <Control.text model=".name" id="name" name="name"
                                placeholder="Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    required: 'This is required ,',
                                    minLength: ' Must be greater than 2 characters',
                                    maxLength: ' Must be 15 characters or less'
                                }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group pt-3">
                        <Label htmlFor="email" md={2}>Email</Label>
                        <Col md={10}>
                            <Control.text model=".email" id="email" name="email"
                                placeholder="Email"
                                className="form-control"
                                validators={{
                                    required, validEmail
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".email"
                                show="touched"
                                messages={{
                                    required: 'This is required ,',
                                    validEmail: ' Invalid Email Address'
                                }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group pt-3">
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Control.password model=".password" id="password" name="password"
                                placeholder="Password"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(6), maxLength: maxLength(15)
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".password"
                                show="touched"
                                messages={{
                                    required: 'This is required ,',
                                    minLength: ' Must be greater than 5 numbers',
                                    maxLength: ' Must be 15 numbers or less',
                                }}
                                />
                        </Col>
                    </Row>
                    <Row className="form-group text-center pt-4 pr-5">
                        <Col md={{size:10, offset:2}}>
                            <Button type="submit" color="success">
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
            <div className="col-md-2">
            </div>
        </div>
    </div>

    );
  }
}
 
export default SignUp;