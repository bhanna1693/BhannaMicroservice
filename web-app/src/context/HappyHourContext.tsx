import React, {createContext, ReactNode, useContext, useReducer} from 'react';
import {Business} from "../models/business";
import {HappyHourSearch} from "../schemas/happy-hour-search-schema";


interface HappyHourState {
    formState: HappyHourSearch;
    businesses: Business[];
    selectedBusiness: Business | null;
}

const enum ActionTypes {
    SET_FORM_STATE,
    SET_BUSINESSES,
    SET_SELECTED_BUSINESS,
}

type Action = {
    type: ActionTypes;
    payload?: any;
};

const searchParams = new URLSearchParams(document.location.href)
const initialState: HappyHourState = {
    formState: {
        search: searchParams.get("search") || "",
        location: searchParams.get("location") || ""
    },
    businesses: [],
    selectedBusiness: null,
    // Initialize other state properties
};

const HappyHourStateContext = createContext<{
    state: HappyHourState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const useHappyHourState = () => useContext(HappyHourStateContext);


export const HappyHourStateProvider: React.FC<{
    children: ReactNode;
}> = ({children}) => {
    const [state, dispatch] = useReducer(HappyHourStateReducer, initialState);

    return (
        <HappyHourStateContext.Provider value={{state, dispatch}}>
            {children}
        </HappyHourStateContext.Provider>
    );
};

const HappyHourStateReducer = (state: HappyHourState, action: Action): HappyHourState => {
    switch (action.type) {
        case ActionTypes.SET_FORM_STATE:
            return {...state, formState: action.payload};
        case ActionTypes.SET_BUSINESSES:
            return {...state, businesses: action.payload};
        case ActionTypes.SET_SELECTED_BUSINESS:
            return {...state, selectedBusiness: action.payload};
        // Handle other actions
        default:
            return state;
    }
};


export const happyHourActions = {
    setFormState: (formState: HappyHourSearch) => ({type: ActionTypes.SET_FORM_STATE, payload: formState}),
    setBusinesses: (businesses: Business[]) => ({type: ActionTypes.SET_BUSINESSES, payload: businesses}),
    // Define other actions here
};
