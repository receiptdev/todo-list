import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  state = {
    input: '',
    todos: [
      { id: 0, text: '리액트 공부하기', done: true },
      { id: 1, text: '컴포넌트 스타일링 해보기', done: false },
    ],
  };

  id = 1;
  _getId = () => ++this.id;

  _handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  };

  _handleInsert = () => {
    const { input, todos } = this.state;
    const newTodo = {
      text: input,
      done: false,
      id: this._getId(),
    };

    this.setState({
      todos: [...todos, newTodo],
      input: '',
    });
  };

  _handleToggle = id => {
    console.log('toggle');
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    // done 반전
    const toggled = {
      ...todos[index],
      done: !todos[index].done,
    };

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length),
      ],
    });
  };

  _handleRemove = id => {
    console.log('remove');
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [
        ...todos.slice(0, index),
        ...todos.slice(index + 1, todos.length),
      ],
    });
  };

  render() {
    const { input, todos } = this.state;
    const { _handleChange, _handleInsert, _handleToggle, _handleRemove } = this;

    return (
      <PageTemplate>
        <TodoInput
          onChange={_handleChange}
          onInsert={_handleInsert}
          value={input}
        />
        <TodoList
          todos={todos}
          onToggle={_handleToggle}
          onRemove={_handleRemove}
        />
      </PageTemplate>
    );
  }
}

export default App;
