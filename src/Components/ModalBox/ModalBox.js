/**
 *   Name: ModalBox.js
 * Author: Francisco J. O'Meany
 * Description: Modal class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ModalBox extends React.Component {
    constructor(props) {
        super(props);
        this.mounted	= false;																					                                            //- In React version 18, a change was made to strict mode so 
        this.state    = { show: props.show };                                                                       //- that components will mount, then unmount, then mount again. 
    }

    componentDidMount() {
      const self		= this;
      if( self.props.title !== undefined && self.props.title !== "" ) {
        const boxTitle = document.getElementById( "contained-modal-title-vcenter" );
        boxTitle.innerHTML = self.props.title;
      }
    }

    setModalShow = () => {
        this.setState({ show: true });
    }

    setModalClosed = () => {
      this.setState({ show: false });
    }

    render() {
        return(
            <Modal style={{maxHeight: "fit-content"}}
                    show={this.state.show}
                    onHide={() => this.setModalClosed(false)}
                    onExited={() => this.props.onExit()}
                    backdrop={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
              <Modal.Header closeButton style={{backgroundColor: '#CFE2FF'}}>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div id="appMenuDescription"></div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.setModalClosed}>{this.props.closeBtn}</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalBox;