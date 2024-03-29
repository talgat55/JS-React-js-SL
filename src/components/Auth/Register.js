import React from 'react';
import {Button, Form, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';
class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        userRef: firebase.database().ref('users')
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    isPasswordValid = ({password, passwordConfirmation}) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    };
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error}</p>);

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = {message: 'Fill in all fields'};
            this.setState({
                errors: errors.concat(error)
            });
            return false;

        } else if (!this.isPasswordValid()) {
            return false;
        } else {
            return true;
        }

    };
    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length
            || !email.length
            || !password.length
            || !passwordConfirmation.length;
    };
    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.state({errors: [], loading: true});
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    }).then(()=>{
                       this.saveUser(createdUser).then(()=>{
                           // this.state({loading: false});
                       })
                    }).catch(err=>{
                        this.state({
                            loading: false,
                            errors: this.state.errors.concat(err)
                        });
                    })

                    ;

                })
                .catch(err => {
                    console.log(err);
                    this.state({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    });
                });
        }
    };
    saveUser = createdUser =>{
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    };
    handleInputError = (errors, inputName) =>{
         return errors.some(error =>
            error.message.toLocaleLowerCase().include(inputName)
         ) ? 'error' : '';
    };



    render() {
        const {
            username,
            email,
            password,
            passwordConfirmation,
            errors,
            loading
        } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange">
                            Register for DevChat
                        </Icon>
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                type="text"
                                value={username}
                            />
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
                            <Form.Input
                                fluid
                                name="passwordConfirmation"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                onChange={this.handleChange}
                                type="password"
                                value={passwordConfirmation}
                                className={this.handleInputError(errors, 'password')}
                            />

                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="orange" fluid
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
                        Alredy a user ? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    };
};

export default Register;
