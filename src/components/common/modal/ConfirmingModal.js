import React, { Component } from 'react';
import Modal from 'react-modal';
import ButtonComponent from '../ButtonComponent';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
};

class ConfirmingModal extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={ this.props.isModal }
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={ this.closeModalAction }
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
            
                    <div className="logout-modal">
                        <div className="text-center">
                            <label>{ this.props.statementLabel }</label>
                        </div>
                        <div>
                            <div className="mt-3 text-right">
                                <div className="cancel-btn-class mr-1">
                                    <ButtonComponent
                                        buttonClass="btn btn-danger"
                                        buttonId="cancel"
                                        buttonLabel={ this.props.cancelLabel }
                                        buttonType="button"
                                        buttonValue="reset"
                                        buttonClickAction={ this.props.cancelButtonClickAction }
                                    />
                                </div>
                                <div className="save-btn-class">
                                    <ButtonComponent
                                        buttonClass="btn btn-primary"
                                        buttonId="success"
                                        buttonLabel={ this.props.confirmLabel }
                                        buttonType="button"
                                        buttonValue="submit"
                                        buttonClickAction={ this.props.confirmButtonClickAction }
                                    />
                                </div>
                            </div>
                        </div>
                    </div> 
                </Modal>
                
            </div>
        );
    }
}

export default ConfirmingModal;