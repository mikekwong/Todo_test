import React, { Component } from 'react'
import TodoBanner from './TodoBanner'
import TodoRow from './TodoRow'
import TodoCreator from './TodoCreator'
import VisibilityControl from './VisibilityControl'

export default class App extends Component {
  state = {
    userName: 'Adam',
    todoItems: [
      { action: 'Buy Flowers', done: false },
      { action: 'Get Shoes', done: false },
      { action: 'Collect Tickets', done: true },
      { action: 'Call Joe', done: false }
    ],
    showCompleted: true
  }

  componentDidMount () {
    let data = localStorage.getItem('todos')
    this.setState(
      // If there is data previously saved in local storage
      data !== null
        ? // retrieve it and parse it back to JSON format
        JSON.parse(data)
        : {
          userName: 'Adam',
          todoItems: [
            { action: 'Buy Flowers', done: false },
            { action: 'Get Shoes', done: false },
            { action: 'Collect Tickets', done: true },
            { action: 'Call Joe', done: false }
          ],
          showCompleted: true
        }
    )
  }

  createNewTodo = task => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, { action: task, done: false }]
        },
        // For persistent data store if navigating away from page
        // save to local storage if a new todo item is created and call it 'todos'
        // local storage can only store string values, so serialize the datat objects to JSON format
        () => localStorage.setItem('todos', JSON.stringify(this.state))
      )
    }
  }

  toggleTodo = todo => {
    this.setState({
      todoItems: this.state.todoItems.map(item =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    })
  }

  todoTableRows = doneValue =>
    this.state.todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ))

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === 'Adam' ? 'Bob' : 'Adam'
    })
  }

  render () {
    const { userName, todoItems, showCompleted } = this.state
    return (
      <div>
        <TodoBanner name={userName} tasks={todoItems} />
        <div className='container-fluid'>
          <div className='my-1'>
            <TodoCreator callback={this.createNewTodo} />
            <table className='table table-striped table-bordered'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>{this.todoTableRows(false)}</tbody>
            </table>
            <div className='bg-secondary text-white text-center p-2'>
              <VisibilityControl
                description='Completed Tasks'
                isChecked={showCompleted}
                callback={checked => this.setState({ showCompleted: checked })}
              />
              {showCompleted && (
                <table className='table table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Done</th>
                    </tr>
                  </thead>
                  <tbody>{this.todoTableRows(true)}</tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <button className='btn btn-primary m-2' onClick={this.changeStateData}>
          Change
        </button>
      </div>
    )
  }
}
