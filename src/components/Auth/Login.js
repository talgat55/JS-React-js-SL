import React from 'react';
import {Button, Form, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        laoding: false,
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p>);

    isFormValid = ({email, password}) =>  email && password;

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.state({errors: [], loading: true});
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email,this.state.password)
                .then(signedInUser =>{
                    console.log(signedInUser);
                })
                .catch(err =>{
                    this.setState({
                       errors: this.state.errors.concat(err),
                       loading: false
                    });
                })

        }
    };

    handleInputError = (errors, inputName) =>{
        return errors.some(error =>
            error.message.toLocaleLowerCase().include(inputName)
        ) ? 'error' : '';
    };



    render() {
        const {
            email,
            password,
            errors,
            loading
        } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet">
                            Login to  DevChat
                        </Icon>
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>

                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email"
                                onChange={this.handleChange}
                                type="email"
                                value={email}
                                className={this.handleInputError(errors, 'email')}
                            />

                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                type="password"
                                value={password}
                                className={this.handleInputError(errors, 'password')}

                            />


                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="violet" fluid
                                size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.state.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>
                        Don't have an account >  ? <Link to="/register">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    };
};

export default Login;
