import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ReactMarkdown from 'react-markdown';
import toStringDate from './Utils';

const MessageItem = ({ message }) => {
    const toolTip = content => <Tooltip>{content}</Tooltip>;

    return (
        <div
            className={
                message.left
                    ? 'text__message text__left'
                    : 'text__message text__right'
            }
        >
            {message.id !== 0 ? (
                <OverlayTrigger
                    delay={{ show: 300, hide: 450 }}
                    placement={message.left ? 'right' : 'left'}
                    overlay={toolTip(toStringDate(message.id))}
                >
                    <div
                        className={
                            message.left
                                ? 'text__message box__left'
                                : 'text__message box__right'
                        }
                    >
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                </OverlayTrigger>
            ) : (
                <div className='spinner'>
                    <Spinner animation='border' />
                </div>
            )}
        </div>
    );
};

MessageItem.propTypes = {
    message: PropTypes.object.isRequired,
};


export default MessageItem;
