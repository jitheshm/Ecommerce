import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    verified: false
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        verify: (state) => {
             
            state.verified = true
        },
        logout:(state)=>{
           
            state.verified=false
        },
        
    }
})

export const { verify,logout} = adminSlice.actions
export default adminSlice.reducer