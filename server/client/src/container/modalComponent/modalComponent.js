import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './modal.css';

export class ModalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            display: false,
            modalId: '',
            modalSize: '',
            showFooter: false,
            footerContent: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.display !== this.props.display) {
            this.setState({
                display: this.props.display,
                modalId: this.props.modalId,
                modalSize: this.props.modalSize
            });

        }
    }

    openModal(e) {
        if (e) e.preventDefault();
        this.setState({
            display: true,
            modalId: this.props.modalId,
            modalSize: this.props.modalSize
        });
    }
    closeModal(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            display: false
        }, () => {
            this.props.onModalClose && this.props.onModalClose();
        })
    }
    render() {
        let modalSize = this.state.modalSize;
        let modalSizeW;
        if (modalSize === 'large') {
            modalSizeW = 'modal-60w';
        } else if (modalSize === 'medium') {
            modalSizeW = 'modal-40w';
        } else if (modalSize === 'small') {
            modalSizeW = 'modal-30w';
        } else if (modalSize === 'x-large') {
            modalSizeW = 'modal-100w';
        }


        const { modalTitle, showFooter, footerContent, children } = this.props;
        return (
            <Modal
                {...this.props}
                centered
                show={this.state.display}
                dialogClassName={modalSizeW}
                bsPrefix="custom-model"
            >
                <Modal.Header closeButton onHide={this.props.onHide}>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {modalTitle ? <div className="modal-title">{modalTitle}</div> : ""}
                    </Modal.Title>
                </Modal.Header>
                <div id={this.state.modalId}>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                </div >

                {(showFooter) ?
                    <Modal.Footer>
                        {footerContent}
                    </Modal.Footer> : ""
                }
            </Modal>
        );
    }
}
ModalComponent.defaultProps = {
    display: false,
    modalTitle: '',
    modalid: '',
    modalsize: 'large',
    showFooter: false,
    footerContent: '',
    onModalClose: () => { }
}

ModalComponent.propTypes = {
    display: PropTypes.bool,
    modalTitle: PropTypes.string,
    modalId: PropTypes.string,
    modalSize: PropTypes.string,
    showFooter: PropTypes.bool,
    onModalClose: PropTypes.func
}