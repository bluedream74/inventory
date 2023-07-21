import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "./index"
import axios from "axios"

export interface ChatType {
  type: string,
  message: string,
  time: number
}

export interface ChatState {
  chats: ChatType[],
  status: "idle" | "loading" | "failed"
}

const initialState: ChatState = {
  chats: [],
  status: 'idle'
}

export const getChatgptResponse = createAsyncThunk(
  "chat/getResponse",
  async (prompt: string, { dispatch })  => {
    const myChat: ChatType = {
      type: "me",
      message: prompt,
      time: Date.now()
    }
    dispatch(addMyChat(myChat))
    const response = await axios.post('http://localhost:8000/chatgpt/getResponseChatgpt', {
      prompt: prompt
    })
    return response.data
  }
)

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMyChat: (state, action: PayloadAction<ChatType>) => {
      state.chats.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getChatgptResponse.fulfilled, (state, action) => {
      state.status = "idle"
      state.chats.push(action.payload)
    })
    .addCase(getChatgptResponse.rejected, (state) => {
      state.status = "failed"
    })
    .addCase(getChatgptResponse.pending, (state) => {
      state.status = "loading"
    })
    .addMatcher(
      (action) => action.meta === "pending",
      (state) => {
        state.status = "loading"
      }
    )
  },
})

export const { addMyChat } = chatSlice.actions

export const selectChats = (state: RootState) => state.chat.chats

export default chatSlice.reducer

