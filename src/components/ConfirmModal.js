import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = ({ show, textHeader, textContent, onHide, onYes }) => {
    return (
        <Modal
            show={show}
            aria-labelledby='contained-modal-title-vcenter'
            centered
            portalclassname='modal'
        >
            <Modal.Header>
                <Modal.Title>{textHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{textContent}</Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={onYes}>
                    Yes
                </Button>
                <Button
                    onClick={() => {
                        onHide();
                    }}
                >
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
