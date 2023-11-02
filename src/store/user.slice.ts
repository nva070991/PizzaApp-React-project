import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
	jwt: string | null
}

const initialState: UserState = {
	jwt: null
}

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt= action.payload
		},
		logOut: (state) => {
			state.jwt = null
		}
	}
})

export default UserSlice.reducer
export const userAction = UserSlice.actions