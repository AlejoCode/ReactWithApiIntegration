import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, Row, Form } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import RepoList from './RepoList';
import withListLoading from './withListLoading';
const OAuthClientId = 'Your_Client_ID';
const OAuthAPIkey = 'Your_APIKey';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.events ";

// const oAuth2Client = new OAuth2(OAuthClientId, OAuthClientSecret)

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
let gapi = window.gapi;

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal: false,
            loading: false,
            repos: null,
            events: []
        };

        this.handleGithub = this.handleGithub.bind(this);
        this.handleGoogleCalendar = this.handleGoogleCalendar.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    handleGithub(userName) {
        this.toggleGitHub();
        const apiUrl = `https://api.github.com/users/${userName.githubUser}/repos`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((repos) => this.setState({ repos: repos }))
            .then(() => this.toggleGitHub());
        this.toggle();
    }


    handleGoogleCalendar() {
        
        gapi.load('client:auth2', () => {
            console.log('loaded client')
            gapi.client.init({
                apiKey: OAuthAPIkey,
                clientId: OAuthClientId,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            gapi.client.load('calendar', 'v3', () => console.log('BAM'))

            gapi.auth2.getAuthInstance().signIn()
            .then(() => {

                const eventStartTime = new Date()
                eventStartTime.setDate(eventStartTime.getDate() + 2 )

                const eventEndTime = new Date()
                eventEndTime.setDate(eventEndTime.getDate() + 2 )
                eventEndTime.setMinutes(eventEndTime.getMinutes() + 45 )

                const event = {
                    summary: 'Interview Meeting with Daniel Salgado',
                    location: '',
                    description: 'Meeting with Daniel Salgado to discuss further the FullStackDeveloper position that hellobuild needs to fill',
                    start: {
                        dateTime: eventStartTime,
                        timeZone: 'America/Denver',
                    },
                    end: {
                        dateTime: eventEndTime,
                        timeZone: 'America/Denver',
                    },
                    colorId: 1,
                }

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                })

                request.execute(event => {
                    alert('Interview Meeting with Daniel Salgado created for 2 days by now')
                    window.open(event.htmlLink)
                })

                   
            })
        })
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    toggleGitHub() {
        this.setState({
            loading: !this.state.loading
        });
    }
    
  render() {
    const ListLoading = withListLoading(RepoList);

    return (
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                    <h2 className="text-center">Hi {localStorage.getItem('userName')}</h2>
                </div>

                 <div className="col-12 col-md-6 mt-3">
                    <div className="ml-3">
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Github integration</ModalHeader>
                        <LocalForm onSubmit={(userName) => this.handleGithub(userName)}>

                        <ModalBody>
                            In order to make the endpoint request we will need to attach your github userName, could you please type it ...
                           
                            <br/>
                            <br/>
                            Hint for testing; mine is: AlejoCode
                            <Row className="form-group mt-3">
                                <Label htmlFor="author" md={2}> userName</Label>
                                <Col md={12}>
                                    <Control.text model=".githubUser" id="githubUser" name="githubUser"
                                        placeholder="Type Your Github user name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".githubUser"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button outline color="success">Enter</Button>{' '}
                        </ModalFooter>
                        </LocalForm> 

                    </Modal>    
                    <Card>
                        <CardBody>
                            <div className="text-center mt-3">
                                <CardTitle tag="h5">Github Integration</CardTitle>
                            </div>
                            <div className="mt-5">
                                <CardSubtitle tag="h6" className="mb-2 text-muted">API Endpoint consumption</CardSubtitle>
                                <CardText>By making use of the github API endpoint https://api.github.com/users/githubUser/repos you can list the repositories of whoever you know his github username, just click on the button to see how it works</CardText>
                            </div>
                            <div className="text-center mt-3 mb-3">
                                <Button type="submit" color="success" onClick={this.toggle}>
                                     <i class="fa fa-github"> github</i>
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-3">
                <div className="ml-3">
                    <Card>
                        <CardBody>
                        <div className="text-center mt-3">
                                <CardTitle tag="h5">Google Calendar Integration</CardTitle>
                            </div>
                            <div className="mt-5">
                                <CardSubtitle tag="h6" className="mb-2 text-muted">API Endpoint consumption</CardSubtitle>
                                <CardText>List the upcoaming events from your google calendar by getting the information form the google endpoint https://developers.google.com/calendar/ using oAuth authentication</CardText>
                            </div>
                            <div className="text-center mt-3 mb-3">
                                <Button  color="success" onClick={() => this.handleGoogleCalendar()}>
                                     <i class="fa fa-google"> Calendar</i>
                                </Button>        
                            </div>
                        </CardBody>
                    </Card>
                    </div>
                           
                </div>
                <div className="col-12 mt-5">
                <ListLoading isLoading={this.state.loading} repos={this.state.repos} />

                </div>
            </div>
        </div>
    );
  }

}
 
export default Login;
