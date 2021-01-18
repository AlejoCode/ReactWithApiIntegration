import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback,Row } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Login extends Component {

    constructor(props) {

        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(values) {

        const formEmail = values.email;
        const formPassword = values.password;
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassWord');

        if(formEmail == userEmail && formPassword == userPassword) {
            alert("Access granted c:");
            localStorage.setItem('userLogged', true);
            this.props.history.push('/profile');
        } else if (formEmail == userEmail) {
            alert("Password is incorrect, please try again !")
        } else if (formPassword == userPassword) {
            alert("Email is incorrect, please try again !")
        } else {
            alert("Password & Email are incorrect :c");
        }
        
    }

  render() {
    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                    <h3 className="text-center">Log In</h3>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-12 col-md-8">
                    <LocalForm onSubmit={(values) => this.handleLogin(values)}>
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
                                    Log In
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
 
export default Login;
