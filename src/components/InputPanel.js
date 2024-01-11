import { IoIosPaperPlane } from 'react-icons/io';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import {
    setInputText,
    setInputMsg,
    setMsgs,
    setVoiceToTextProcessing,
    fetchMessage,
    fetchTextFromAudio
} from '../features/message/messagesSlice';
import ConfirmModal from './ConfirmModal';

const InputPanel = () => {
    const dispatch = useDispatch();

    const { inputText, resMsg, msgs, voiceToTextProcessing } = useSelector(
        store => store.messages
    );

    const {
        recordingBlob,
    } = useAudioRecorder();

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

    useEffect(() => {
        if (!recordingBlob) return;
    }, [recordingBlob])


    const sendAudio = (recBlob) => {
        dispatch(setVoiceToTextProcessing(true));
        dispatch(fetchTextFromAudio(recBlob));
    };

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
            <div className='input__recorder'>
                <span className='recorder' style={voiceToTextProcessing ? ({ display: 'none' }) : ({ display: 'block' })}>
                    <AudioRecorder
                        onRecordingComplete={sendAudio}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }}
                        downloadOnSavePress={false}
                        downloadFileExtension="webm"
                        showVisualizer={true}
                    />
                </span>
                {voiceToTextProcessing ? (
                    <span className='recorder'>
                        <Button variant="warning">
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Processing...
                        </Button></span>
                ) : (<span className='recorder_wait' />)}
            </div>
            <div className='input__panel'>
                <input
                    type='text'
                    className='input input__message'
                    placeholder='Chat với tôi'
                    value={inputText}
                    onChange={e => {
                        dispatch(setInputText(e.target.value));
                    }}
                    disabled={voiceToTextProcessing}
                />
                <button
                    className='input btn__send'
                    onClick={e => {
                        e.preventDefault();
                        inputText.trim() && sendMessage();
                    }}
                    disabled={voiceToTextProcessing}
                >
                    <IoIosPaperPlane />
                </button>
            </div>
            <ConfirmModal
                show={show}
                textHeader='Đóng'
                textContent='Xác nhận đóng ứng dụng?'
                onHide={() => {
                    setShow(false);
                }}
                onYes={() => {
                    const root = document.getElementById('root');
                    root.remove();
                    setShow(false);
                }}
            />
        </form >
    );
};

export default InputPanel;
