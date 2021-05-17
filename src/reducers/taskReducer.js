/* eslint-disable import/no-anonymous-default-export */
export default (state=[], action) => {
    switch(action.type){
        case 'CREATE_TASK':
            state.push(action.payload)
            return [...state];
        case 'EDIT_TASK':
            const new_arr = [...state]
            new_arr[action.payload.index] = {...new_arr[action.payload.index], title: action.payload.title, emoji: action.payload.emoji, status: action.payload.status}
            return [...new_arr]
        case 'DELETE_TASK':
            state.splice(action.payload, 1)
            return [...state]
        case 'REORDER_TASK':
            const [reorderedItem] = state.splice(action.payload.source, 1);
            state.splice(action.payload.dest, 0, reorderedItem);
            return [...state]
        default:
            return state
    }
}