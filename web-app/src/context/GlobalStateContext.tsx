// GlobalStateContext.tsx
import React, {createContext, useContext, useReducer, ReactNode} from 'react';
import {User} from "../models/user";

interface GlobalState {
    isLoggedIn: boolean;
    user: User | null;
    // Add other global state properties here
}

const enum ActionTypes {
    SET_USER,
    REMOVE_USER
}

type Action = {
    type: ActionTypes;
    payload?: any;
};

const initialState: GlobalState = {
    isLoggedIn: false,
    user: null,
    // Initialize other state properties
};

const GlobalStateContext = createContext<{
    state: GlobalState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const useGlobalState = () => useContext(GlobalStateContext);


export const GlobalStateProvider: React.FC<{
    children: ReactNode;
}> = ({children}) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

const globalStateReducer = (state: GlobalState, action: Action): GlobalState => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {...state, user: action.payload};
        case ActionTypes.REMOVE_USER:
            return {...state, user: null};
        // Handle other actions
        default:
            return state;
    }
};


export const globalActions = {
    setUser: (user: User) => ({type: ActionTypes.SET_USER, payload: user}),
    removeUser: () => ({type: ActionTypes.SET_USER})
    // Define other actions here
};
