import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../features/message/messagesSlice';

export const store = configureStore({
    reducer: { messages: messagesReducer },
});
