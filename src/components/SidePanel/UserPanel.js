import React from 'react';
import {Dropdown, Grid, Header, Icon} from 'semantic-ui-react';
import firebase from '../../firebase';
class UserPanel extends React.Component {
    dropdownOptions = () => [
        {
            key: "user",
            text: <span> Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>
        }, {
            key: "signout",
            text: <span onClick={this.handleSignout}>Sign Out</span>
        },
    ];
    handleSignout = () =>{
        firebase
            .auth()
            .signOut()
            .then(()=> console.log('signed out'))

    };

    render() {
        return (
            <Grid style={{background: "#4c3c4c"}}>
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2em', margin: 0}}>
                        { /*  app header*/}
                        <Header inverted floated="left" as="h2">
                            <Icon name="code"/>
                            <Header.Content>
                                DevChat
                            </Header.Content>
                        </Header>
                    </Grid.Row>
                    { /*  user dropdown*/}
                    <Header style={{padding: '0.25em'}} as="h4" inverted>
                        <Dropdown trigger={
                            <span> user</span>
                        }
                                  options={this.dropdownOptions()}
                        />
                    </Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;