import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const welcomeMsg = 'Xin chào, tôi có thể giúp gì cho bạn?';

const maxChatHistory = 10;

const initialState = {
    msgs: [
        { id: Date.now(), text: welcomeMsg, left: true, top: true },
    ],
    inputMsg: null,
    resMsg: { context: null },
    inputText: '',
};


export const fetchMessage = createAsyncThunk('fetchMessage', async (resMes) => {
    try {
        let chat_history = [];
        let chat_message = {};
        let i = 0;
        for (const msg of resMes.all_msgs) {
            if (msg.left) {
                chat_message = { ...chat_message, output: msg.text, context: msg.context };
            } else {
                chat_message = { ...chat_message, input: msg.text };
            }

            if (msg.left && i !== 0) {
                chat_history.push(chat_message);
                chat_message = {};
            }
            i++;
        }
        chat_history = chat_history.slice(maxChatHistory * -1)
        console.log(chat_history);
        const res = await axios.post(
            `http://localhost:8081/api/chat`,
            {
                text_message: resMes.inputText,
                chat_history: chat_history,
            }
        );
        return res.data;
    } catch (err) {
        return console.log(err);
    }
});


const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setInputText: (state, action) => {
            state.inputText = action.payload;
        },

        setInputMsg: (state, action) => {
            state.inputMsg = action.payload;
        },

        setResMsg: (state, action) => {
            state.resMsg = action.payload;
        },

        setMsgs: (state, action) => {
            state.msgs = action.payload;
        },

        clearAll: (state, _) => {
            state.msgs = [
                {
                    id: Date.now(),
                    text: welcomeMsg,
                    left: true,
                    top: true,
                },
            ];
            state.inputMsg = null;
            state.resMsg = { context: null };
            state.inputText = '';
        },
    },

    extraReducers: builder => {
        builder.addCase(fetchMessage.fulfilled, (state, action) => {
            const mes = {
                id: Date.now(),
                text: action.payload.response,
                left: true,
                top: true,
                context: action.payload.context,
            };

            const allMes = state.msgs.filter(m => {
                return m.id !== 0;
            })

            state.msgs = [
                ...allMes.map(v => {
                    return { ...v, top: false };
                }),
                mes,
            ];

            state.msgs = state.msgs.slice(maxChatHistory * 2 * -1)

            state.resMsg = mes;
        });
    },
});


export const { setInputText, setInputMsg, setMsgs, clearAll } =
    messagesSlice.actions;

export default messagesSlice.reducer;
