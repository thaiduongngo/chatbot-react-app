import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAll } from '../features/message/messagesSlice';
import { FaTimesCircle } from 'react-icons/fa';
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
                textHeader='Xác nhận đóng'
                textContent='Bạn có muốn đóng App?'
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
                textHeader='Xác nhận xoá tất cả'
                textContent='Bạn có muốn xoá tất cả tin nhắn?'
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
