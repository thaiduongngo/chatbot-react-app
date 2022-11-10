import { IoIosPaperPlane } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    setInputText,
    setInputMsg,
    setMsgs,
    fetchMessage,
    fetchForex,
    fetchWeather,
} from '../features/message/messagesSlice';
import ConfirmModal from './ConfirmModal';

const InputPanel = () => {
    const dispatch = useDispatch();
    const { inputText, inputMsg, resMsg, msgs } = useSelector(
        store => store.messages
    );
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchSub = () => {
            if (resMsg.context === 'forex') {
                dispatch(fetchForex());
            } else if (resMsg.context === 'weather') {
                dispatch(fetchWeather());
            }
        };

        resMsg && fetchSub();
    }, [inputMsg, resMsg, dispatch]);

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

            dispatch(setInputMsg(mes));
            dispatch(
                setMsgs([
                    ...msgs.map(m => {
                        return { ...m, top: false };
                    }),
                    mes,
                ])
            );
            dispatch(fetchMessage(mes.text));
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
                    placeholder='Say something'
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
        </form>
    );
};

export default InputPanel;
