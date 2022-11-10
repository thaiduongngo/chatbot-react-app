import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import SubItemWeather from './SubItemWeather';
import SubItemForex from './SubItemForex';
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
                    {message.text}
                </div>
            </OverlayTrigger>
            {message.context === 'weather' ? (
                message.weatherInfo ? (
                    <SubItemWeather weatherInfo={message.weatherInfo} />
                ) : (
                    <div className='spinner'>
                        <Spinner animation='border' />
                    </div>
                )
            ) : (
                ''
            )}

            {message.context === 'forex' ? (
                message.forexInfo ? (
                    <SubItemForex forexInfo={message.forexInfo} />
                ) : (
                    <div className='spinner'>
                        <Spinner animation='border' />
                    </div>
                )
            ) : (
                ''
            )}
        </div>
    );
};

MessageItem.propTypes = {
    message: PropTypes.object.isRequired,
};

export default MessageItem;
