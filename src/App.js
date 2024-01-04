import Header from './components/Header';
import InputPanel from './components/InputPanel';
import MessageContainer from './components/MessageContainer';

function App() {
    return (
        <div className='App'>
            <Header title='Chatbot Demo' />
            <MessageContainer />
            <InputPanel />
        </div>
    );
}

export default App;
