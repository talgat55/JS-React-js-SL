import React from 'react';
import './App.css';
import {Grid} from 'semantic-ui-react';
import ColorPanel from './components/ColorPanel/ColorPanel';
import SidePanel from './components/SidePanel/SidePanel';
import Messages from './components/Messages/Messages';
import MetaPanel from './components/MetaPanel/MetaPanel';
import {connect} from 'react-redux';
const App = ({currentUser}) => (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel  currentUser={currentUser}/>

        <Grid.Column style={{ marginLeft: 320 }}>
            <Messages />
        </Grid.Column>

        <Grid.Column width={4}>
            <MetaPanel />
        </Grid.Column>
    </Grid>
);
const mapStateToProps = state =>({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(App);
