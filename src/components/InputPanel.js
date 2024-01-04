import { IoIosPaperPlane } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    setInputText,
    setInputMsg,
    setMsgs,
    fetchMessage,
} from '../features/message/messagesSlice';
import ConfirmModal from './ConfirmModal';

const InputPanel = () => {
    const dispatch = useDispatch();
    const { inputText, resMsg, msgs } = useSelector(
        store => store.messages
    );

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (resMsg?.context === 'quit') {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [resMsg]);

    useEffect(() => {
        const scrollContainer = function () {
            const messageContainer = document.querySelector(
                '.message__container'
            );
            messageContainer.scrollTop = messageContainer.scrollHeight;
        };

        scrollContainer();
    }, [msgs]);

    const sendMessage = () => {
        const getMessage = () => {
            const mes = {
                id: Date.now(),
                text: inputText.trim(),
                left: false,
                top: false,
            };

            const resMes = {
                id: 0,
                inputText: mes.text,
                left: true,
                top: true,
                all_msgs: msgs,
            };

            dispatch(setInputMsg(mes));
            dispatch(
                setMsgs([
                    ...msgs.map(m => {
                        return { ...m, top: false };
                    }),
                    mes,
                    resMes,
                ])
            );
            dispatch(fetchMessage(resMes));
            dispatch(setInputText(''));
        };

        inputText && getMessage();
    };

    return (
        <form>
            <div className='input__panel'>
                <input
                    type='text'
                    className='input input__message'
                    placeholder='Chat với tôi'
                    value={inputText}
                    onChange={e => {
                        dispatch(setInputText(e.target.value));
                    }}
                />
                <button
                    className='input btn__send'
                    onClick={e => {
                        e.preventDefault();
                        inputText.trim() && sendMessage();
                    }}
                >
                    <IoIosPaperPlane />
                </button>
            </div>
            <ConfirmModal
                show={show}
                textHeader='Đóng'
                textContent='Xác nhận đóng App?'
                onHide={() => {
                    setShow(false);
                }}
                onYes={() => {
                    const root = document.getElementById('root');
                    root.remove();
                    setShow(false);
                }}
            />
        </form>
    );
};

export default InputPanel;
