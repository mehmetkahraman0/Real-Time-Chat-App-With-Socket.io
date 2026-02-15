import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../Model/Room";
import type { Chanel } from "../../Model/Chanel";

interface selectedState {
    selectedRoom: Room | null
    selectedChanel: Chanel | null
    selectedNavbar : string | null
}

const initialState: selectedState = {
    selectedChanel: JSON.parse(localStorage.getItem("selectedChanel") || "null"),
    selectedRoom: JSON.parse((localStorage.getItem("selectedRoom")) || "null"),
    selectedNavbar:"Ana Sayfa"
}

const selectedSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        setSelectedRoom: (state, action: PayloadAction<any>) => {
            state.selectedRoom = action.payload || null;
            if (action.payload) {
                localStorage.setItem("selectedRoom", JSON.stringify(action.payload));
            }
        },
        setSelectedChanel: (state, action: PayloadAction<any>) => {
            state.selectedChanel = action.payload || null;
            if (action.payload) {
                localStorage.setItem("selectedChanel", JSON.stringify(action.payload));
            }
        },
        setSelectedNavbar : ( state, action) => {
            state.selectedNavbar = action.payload
        }

    }
})

export const { setSelectedRoom, setSelectedChanel, setSelectedNavbar } = selectedSlice.actions;
export default selectedSlice.reducer