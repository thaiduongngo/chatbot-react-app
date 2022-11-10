import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    msgs: [
        { id: Date.now(), text: 'How can I help you?', left: true, top: true },
    ],
    inputMsg: null,
    resMsg: { context: null },
    inputText: '',
};

export const fetchMessage = createAsyncThunk('fetchMessage', async text => {
    try {
        const res = await axios.get(
            `http://localhost:5000/api/chat/?text_message=${text}`
        );
        return res.data;
    } catch (err) {
        return console.log(err);
    }
});

export const fetchForex = createAsyncThunk('fetchForex', async () => {
    try {
        const currencyPairs = [
            'USDVND',
            'USDKRW',
            'USDEUR',
            'USDJPY',
            'USDAUD',
            'USDGBP',
            'EURUSD',
        ];
        const res = await axios.get(
            `http://localhost:5000/api/forex/${currencyPairs.reduce(
                (a, c) => a + ',' + c
            )}`
        );
        return res.data;
    } catch (err) {
        return console.log(err);
    }
});

export const fetchWeather = createAsyncThunk('fetchWeather', async () => {
    try {
        const res = await axios.get(`http://localhost:5000/api/weather/`);
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
                    text: 'How can I help you?',
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

            state.msgs = [
                ...state.msgs.map(m => {
                    return { ...m, top: false };
                }),
                mes,
            ];

            state.resMsg = mes;
        });

        builder.addCase(fetchForex.fulfilled, (state, action) => {
            state.msgs = [...state.msgs];
            state.msgs[state.msgs.length - 1].forexInfo = {
                data: Object.entries(action.payload.rates),
                timeStamp: Date.now(),
            };
        });

        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.msgs = [...state.msgs];

            state.msgs[state.msgs.length - 1].weatherInfo = {
                ...action.payload,
                timeStamp: Date.now(),
            };
        });
    },
});

export const { setInputText, setInputMsg, setMsgs, clearAll } =
    messagesSlice.actions;

export default messagesSlice.reducer;
