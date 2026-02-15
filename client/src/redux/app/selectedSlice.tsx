import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Room } from "../../Model/Room.ts";
import type { Chanel } from "../../Model/Chanel.ts";

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
        setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
            state.selectedRoom = action.payload || null;
            if (action.payload) {
                localStorage.setItem("selectedRoom", JSON.stringify(action.payload));
            }
        },
        setSelectedChanel: (state, action: PayloadAction<Chanel | null>) => {
            state.selectedChanel = action.payload || null;
            if (action.payload) {
                localStorage.setItem("selectedChanel", JSON.stringify(action.payload));
            }
        },
        setSelectedNavbar: (state, action: PayloadAction<string | null>) => {
            state.selectedNavbar = action.payload;
        }

    }
})

export const { setSelectedRoom, setSelectedChanel, setSelectedNavbar } = selectedSlice.actions;
export default selectedSlice.reducer