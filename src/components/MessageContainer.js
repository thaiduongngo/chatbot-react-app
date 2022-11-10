import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';

const MessageContainer = () => {
    const { msgs } = useSelector(store => store.messages);

    return (
        <div className='message__container'>
            {msgs.map(m => (
                <MessageItem key={m.id} message={m} />
            ))}
        </div>
    );
};

export default MessageContainer;
