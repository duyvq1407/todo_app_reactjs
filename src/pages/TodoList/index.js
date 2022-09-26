import { useEffect, useState } from 'react';
import Todo from '../../components/Todo';
import TodoForm from '../../components/TodoForm';


function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todoEdit, setTodoEdit] = useState({});
  // const [isSearch, setIsSearch] = useState(false)
  
  const handleAdd = (data) => {
    localStorage.setItem('todoList', JSON.stringify([...todoList, data]))
    setTodoList([...todoList, data])
    getTodoList();
  }

  const handleRemove = (id) => {
    let newlist = todoList.filter(item => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(newlist))
    setTodoList(newlist)
    getTodoList();
  }

  const handleEdit = (todo) => {
    setTodoEdit(todo)
  }

  const handleUpdate = (todo) => {
    let newlist = todoList.map(item => {
      if (item.id === todo.id) {
        return todo;
      }
      return item
    })
    localStorage.setItem('todoList', JSON.stringify(newlist))
    setTodoEdit({})
  }

  const handleSearch = (todoSearch, isCancel) => {
    if (isCancel) {
      getTodoList();
    } else {
      let searchResult = [...JSON.parse(localStorage.getItem('todoList'))]
      const {title, deadlineSearchFrom, deadlineSearchTo, status} = todoSearch
      //filter by title

      if(title){
          searchResult = searchResult.filter(item => item.title.toLowerCase().includes(title.toLowerCase()))
      }

      //filter by deadline
      if (deadlineSearchFrom && deadlineSearchTo) {
          searchResult = searchResult.filter(item => (item.deadline >= deadlineSearchFrom && item.deadline <= deadlineSearchTo))
      } else if (deadlineSearchFrom || deadlineSearchTo) {
          if (deadlineSearchFrom) {
              searchResult = searchResult.filter(item => item.deadline >= deadlineSearchFrom)
          } else {
              searchResult = searchResult.filter(item => item.deadline <= deadlineSearchTo)
          }
      }

      //filter by status
      if (status) {
        searchResult = searchResult.filter(item => item.status === status)
      }
      setTodoList(searchResult)
      // getTodoList();
    }
  }
  
  const getTodoList = () => {
    if (localStorage.getItem('todoList')) {
      const data = JSON.parse(localStorage.getItem('todoList'))
      setTodoList(data)
    }    
  };

  useEffect(() => {
    getTodoList();
  },[])
  
  return (
    <div className='flex'>
      <div className='container todo-app mx-auto'>
          <TodoForm 
            // isSearch={isSearch}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            todoEdit={todoEdit}
            onSearch={handleSearch}
          />
          <div className='mt-[30px]'>
            <Todo 
              onDelete={handleRemove} 
              onEdit={handleEdit} 
              todoList={todoList}
            />
          </div>
      </div>
    </div>
  );
}

export default TodoList;
