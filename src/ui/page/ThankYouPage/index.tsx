import React from 'react';
import {Button, Container} from "react-bootstrap";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Navbar from "../../component/Navbar";

type Props = RouteComponentProps & {};
type State = {};

class ThankYouPage extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <Navbar/>
                <Container>
                    <h1>Thank You!!!!!!!</h1>
                    <Button
                        variant="primary"
                        onClick={() => {
                            this.props.history.push("/");
                        }}
                    >
                        Back
                    </Button>
                </Container>
            </div>
        );
    }
}

export default withRouter(ThankYouPage);