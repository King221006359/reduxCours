import { createStore } from 'redux';
import { produce } from 'immer';


const initialState = {
    name: 'Isiking', // 'Isiking' should be enclosed in quotes
    address: {
        street: '123 Main st',
        city: 'kigali',
        state: 'MA'
    },
};

const STREET_UPDATED = 'STREET_UPDATED';

const updatedStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload, // Fix typo here, change 'streer' to 'street'
            //     },
            // };
            return produce(state, (draft) =>{
                draft.address.street = action.payload
            })
        default:
            return state;
    }
};

const store = createStore(reducer);
console.log('Initial State ', store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('Updated State ', store.getState());
});

store.dispatch(updatedStreet('456 Main St'));

unsubscribe();