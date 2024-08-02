import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
}

export const fetchUserData = createAsyncThunk(
    'user/getUserData',
    async (token) => {
        const res = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json' 
            }
        })
        const data = await res.json();
        return data.body;
    }
)

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (data) => {
        const res = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT', 
            headers: { 
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data.userNames)
        })
        const resData = await res.json();
        return resData.body
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        emptyUserData(state) {
            state.email = ''
            state.firstName = ''
            state.lastName = ''
            state.userName = ''
            state.id = ''
            state.createdAt = ''
            state.updatedAt = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                state.email = payload.email
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.userName = payload.userName
                state.id = payload.id
                state.createdAt = payload.createdAt
                state.updatedAt = payload.updatedAt
            })
            .addCase(updateUserData.fulfilled, (state, { payload }) => {
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.userName = payload.userName
                state.updatedAt = payload.updatedAt
            })
    },
})

// selectors
export const getUserData = (state) => state.user

//actions
export const { emptyUserData } = userSlice.actions

//reducers
export const userReducer = userSlice.reducer