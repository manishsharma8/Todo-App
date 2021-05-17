export const createTask = (id, title, emoji, status) => {
    return { 
        type: 'CREATE_TASK',
        payload: {id, title, emoji, status}
    }
}

export const ReorderTask = (source, dest) => {
    return {type: 'REORDER_TASK', payload: {source, dest}}
}

export const editTask = (index, title, emoji, status) => {
    return { type: 'EDIT_TASK', payload:{index, title, emoji, status} }
}

export const deleteTask = (id) => {
    return { type: 'DELETE_TASK', payload:id }
}

export const fetchTask = () => {
    return {type: 'FETCH_TASK'}
}