import React, {Fragment, useEffect, useState} from 'react';
import {Container, Nav, Navbar as BootstrapNavbar} from 'react-bootstrap';
import {Link, useHistory, useLocation, withRouter} from 'react-router-dom';
import AuthService from "../../../service/AuthService";
import {User} from "../../../data/user";
import "./index.css";

type Props = {};

export default function Navbar(props: Props) {
    const [user, setUser] = useState<User | null>(AuthService.user);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        AuthService.onAuthStateChanged((user) => {
            console.log("Narbar onAuthStateChanged", user);
            setUser(user);
        });
    }, []);

    return (
        <BootstrapNavbar bg="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand className="navbar-title" href="/">RB Coffee Roaster</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">
                            <BootstrapNavbar.Text>Home</BootstrapNavbar.Text>
                        </Link>
                        <Link to="/cart">
                            <BootstrapNavbar.Text>Cart</BootstrapNavbar.Text>
                        </Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        {
                            (user) ? (
                                <>
                                    <BootstrapNavbar.Text>{user.email}</BootstrapNavbar.Text>
                                    <BootstrapNavbar.Text
                                        onClick={() => {
                                            AuthService.signOut(() => {
                                                history.push("/")
                                            })
                                        }}
                                    >
                                        Sign Out
                                    </BootstrapNavbar.Text>
                                </>
                            ) : (
                                <Link to={`/sign-in?from=${location.pathname}`} >
                                    <BootstrapNavbar.Text>Sign In</BootstrapNavbar.Text>
                                </Link>
                            )
                        }
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}