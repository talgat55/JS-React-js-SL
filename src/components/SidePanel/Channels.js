import React from 'react';
import {Button, Icon, Menu, Modal} from 'semantic-ui-react';
import firebase from '../../firebase';
import {connect} from 'react-redux';
import {setCurrentChannel} from "../../actions";

class Channels extends React.Component {
    state = {
        activeChannel: '',
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        modal: false
    };
    componentDidMount() {
        this.addListeners();
    };
    setFirstChannel= () =>{
        const firstChannel = this.state.channels[0];
        if(this.state.firstLoad && this.state.channels.length > 0){
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);
        }

        this.setState({ firstLoad: false});
    };
    addListeners = () =>{
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap =>{
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels},
                ()=> this.setFirstChannel()
                );

        })
    };


    closeModal = () => this.setState({modal: false});
    openModal = () => this.setState({modal: true});
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;

    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id });
    };

    changeChannel = channel =>{
        this.setActiveChannel(channel);
      this.props.setCurrentChannel(channel);
    };
    displayChannels = channels => {
        channels.length  > 0 &&
        channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={()=> this.changeChannel(channel)}
                name={channel.name}
                style={{ opacity: .7}}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}
            </Menu.Item>
        ));
    };
    addChannel = () => {
        const {channelsRef, channelName, channelDetails, user} = this.state;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
    };

            channelsRef
                .child(key)
                .update(newChannel)
                .then(()=>{
                    this.setState({channelName: '', channelDetails: ''});
                    this.closeModal();
                    console.log('channel added');

                })
                .catch(err=>{
                   console.log(err);
                });

    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.addChannel();
        }
    };

    render() {
        const {channels, modal} = this.state;
        return (
            <>
                <Menu.Menu style={{paddingBottom: '2em'}}>
                    <Menu.Item>
                <span>
                    <Icon name="exchange"/> CHANNELS
                </span>{" "}
                        ({channels.length}) <Icon name="add" onClick={this.openModal}/>
                    </Menu.Item>
                    { this.displayChannels(channels)}
                </Menu.Menu>
                <Modal
                    basic
                    open={modal}
                    onClose={this.closeModal}
                >
                    <Modal.Header>Add a Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Name of Channel"
                                    name="channelName"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    fluid
                                    label="About the Channel"
                                    name="channelDetails"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark"/> Add
                        </Button>
                        <Button color="red" inverted>
                            <Icon name="remove" onClick={this.closeModal}/> Cancel
                        </Button>
                    </Modal.Actions>

                </Modal>
            </>
        );
    }
}

export default connect(null,
    {setCurrentChannel}
    )(Channels);