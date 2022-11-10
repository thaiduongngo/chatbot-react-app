import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAll } from '../features/message/messagesSlice';
import { FaTimesCircle } from 'react-icons/fa';
import { SiRobotframework } from 'react-icons/si';
import {
    BsFillArrowDownCircleFill,
    BsFillArrowUpCircleFill,
    BsTrashFill,
} from 'react-icons/bs';
import ConfirmModal from './ConfirmModal';

const Header = ({ title }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showClear, setShowClear] = useState(false);

    const scrollContainerBottom = () => {
        const messageContainer = document.querySelector('.message__container');
        messageContainer.scrollTop = messageContainer.scrollHeight;
    };

    const scrollContainerTop = () => {
        const messageContainer = document.querySelector('.message__container');
        messageContainer.scrollTop = 0;
    };

    return (
        <div className='header'>
            <div>
                <span className='robot__icon'>
                    <SiRobotframework />
                </span>
                <span className='bot__title'>{title}</span>
            </div>
            <div className='nav__topdown'>
                <BsFillArrowUpCircleFill
                    className='btn__func'
                    onClick={scrollContainerTop}
                />
                <BsFillArrowDownCircleFill
                    className='btn__func'
                    onClick={scrollContainerBottom}
                />{' '}
                <BsTrashFill
                    className='btn__spfunc'
                    onClick={() => {
                        setShowClear(true);
                    }}
                />{' '}
                <FaTimesCircle
                    className='btn__spfunc'
                    onClick={() => {
                        setShow(true);
                    }}
                />
            </div>
            <ConfirmModal
                show={show}
                textHeader='Confirm Close'
                textContent='Do you want to close the App?'
                onHide={() => {
                    setShow(false);
                }}
                onYes={() => {
                    const root = document.getElementById('root');
                    root.remove();
                    setShow(false);
                }}
            />

            <ConfirmModal
                show={showClear}
                textHeader='Confirm Clear'
                textContent='Do you want to clear all messages?'
                onHide={() => {
                    setShowClear(false);
                }}
                onYes={() => {
                    dispatch(clearAll());
                    setShowClear(false);
                }}
            />
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
