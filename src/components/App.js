import React from 'react';
import AddTask from './AddTask'
import TaskList from './TaskList'

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class App extends React.Component{
    state = {task: '', taskList: [], edit: false, id:0}

    onTaskAdd = (task) => {
        this.setState({task : ''})
        this.setState({taskList: [...this.state.taskList, task]})
    }

    onTaskDelete = (id) => {
        const list = this.state.taskList;
        list.splice(id, 1);
        this.setState({ taskList: list });
    }

    onTaskEdit = (id) => {
        this.setState({edit: true, id: id, task: this.state.taskList[id]})
    }

    onTaskUpdate = (task) => {
        const list = [...this.state.taskList]
        list[this.state.id] = task
        this.setState({taskList: list, edit: false, task: ''})
    }

    onDragEnd = (result) => {
        if(!result.destination)
            return;
        const items = Array.from(this.state.taskList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.setState({taskList: items})
    }

    render(){
        return(
            <div className="grid md:grid-cols-3 md:m-0 md:mt-10 m-10">
                <div className="md:col-start-2 grid grid-flow-row align-middle divide-y-2 divide-blue-100">
                    <div className="grid grid-cols-4 mb-3">
                        <div className="text-3xl font-semibold text-blue-900">Task</div>
                        <div className="col-start-3 ml-auto my-auto text-xl font-medium text-blue-600">Active</div>
                        <div className="col-start-4 ml-auto my-auto text-xl font-medium text-gray-600">Finished</div>
                    </div>
                    <div className="row-start-2 mb-5">
                        <div className="mt-5">
                            <AddTask task={this.state.task} onTaskAdd={this.onTaskAdd} onTaskUpdate={this.onTaskUpdate} edit={this.state.edit} />
                        </div>
                    </div>
                    <div className="row-start-3">
                        <div className="mt-5">
                            <DragDropContext onDragEnd={this.onDragEnd} >
                                <Droppable droppableId="tasks">
                                    {(provided) => 
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {this.state.taskList.map((task, id) => 
                                                <TaskList task={task} key={task} id={id} onDeleteClick={this.onTaskDelete} onEditClick={this.onTaskEdit} />
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    }
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;