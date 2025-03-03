import React, { Component } from 'react';
import './NotificationMessageStyle.css';
import { connect } from 'react-redux';

/** Calling method
     <NotificationMessage
        messageType={"Message-content-success" || "Message-content-warning"}
        messageContent={""}
        openNotification={false}
    />
 */

class NotificationMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotificationOpen: false
        }
    }

    componentDidUpdate(preProps){
        if(this.props !== preProps){
            console.log("dataa", this.props.notificationMessageData);
            this.setState({ isNotificationOpen: this.props.notificationMessageData.isOpenNotification });
            setTimeout(() => {
                this.setState({ isNotificationOpen: false });
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                { 
                    this.state.isNotificationOpen ?
                    <div id="pane" className="panel-wrap panel">
                     <div className={ "Message-content-" + this.props.notificationMessageData.notificationType }>
                            <div className="notification-close-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16" onClick={ () => this.setState({ isNotificationOpen: false }) }>
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                            { this.props.notificationMessageData.notificationMessage }
                        </div>
                    </div>
                    : null 
                }
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return (
        {
            notificationMessageData: state.notificationMessage.notificationMessage
        }
    );
};
  
export default connect(mapStateToProps)(NotificationMessage);