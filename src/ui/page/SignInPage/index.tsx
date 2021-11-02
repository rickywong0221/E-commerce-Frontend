import React, {ChangeEvent, FormEvent} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Navbar from "../../component/Navbar";
import AuthService from "../../../service/AuthService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getQueryVariable} from "../../../util/UrlUtil";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";

type Props = RouteComponentProps & {};
type State = {
    email: string,
    password: string
};

class SignInPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onPostSignIn = this.onPostSignIn.bind(this);
    }

    onSubmitSignIn(event: FormEvent) {
        event.preventDefault();
        AuthService.signInWithEmailAndPassword(
            this.state.email,
            this.state.password,
            this.onPostSignIn
        );
    }

    onPostSignIn(isSuccess: boolean) {
        let targetPath = getQueryVariable(this.props.location.search, "from");
        if (!targetPath) {
            targetPath = "/";
        }
        this.props.history.push(targetPath);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // @ts-ignore
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Container>
                    <Form onSubmit={this.onSubmitSignIn}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </Form>

                    <br/>

                    <Row>
                        <Col md={4}>
                            <GoogleLoginButton
                                style={{margin: 0}}
                                onClick={() => {
                                    AuthService.signInWithGoogle(this.onPostSignIn)
                                }}
                            />

                            <FacebookLoginButton
                                style={{margin: 0}}
                                onClick={() => {
                                    AuthService.signInWithFacebook(this.onPostSignIn)
                                }}
                            />
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default withRouter(SignInPage);