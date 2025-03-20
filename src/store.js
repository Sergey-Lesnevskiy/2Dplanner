import { createStore } from 'redux';

const initialState = {
    items: [], 
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_CHECKBOX':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload ? { ...item, checked: !item.checked } : item
                ),
            };
        case 'ADD_ITEMS':
            return {
                ...state,
                items: [
                    ...state.items,
                    ...action.payload.map(item => ({
                        ...item,
                        position: { x: 0, y: 0 },
                    })),
                ],
            };
        case 'SAVE_ITEM_POSITIONS':
            return {
                ...state,
                items: state.items.map(item =>
                    action.payload[item.id] ? { ...item, position: action.payload[item.id] } : item
                ),
            };
        default:
            return state;
    }
};

const store = createStore(itemsReducer);

export default store;