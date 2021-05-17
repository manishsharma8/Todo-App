import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux'

import TaskList from './todo/TaskList'
import {ReorderTask} from '../actions'

class App extends React.Component{
    onDragEnd = (result) => {
        if(!result.destination)
            return;
        this.props.ReorderTask(result.source.index, result.destination.index)
    }

    render(){
        return(
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <TaskList />
                </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {tasks: state.task}
}

export default connect(mapStateToProps, {ReorderTask})(App);