import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Todo from '../../components/Todo';
import AddForm from '../../components/TodoForm/AddForm';
import EditForm from '../../components/TodoForm/EditForm';
import {FaSearch} from 'react-icons/fa'
import SearchForm from '../../components/TodoForm/SearchForm';


function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todoSearch, setTodoSearch] = useState([]);
  const [todoEdit, setTodoEdit] = useState({});
  const [isSearch, setIsSearch] = useState(false)
  
  const handleAdd = (data) => {
    localStorage.setItem('todoList', JSON.stringify([...todoList, data]))
    setTodoList([...todoList, data])
    getTodoList();
    toast.success("Thêm thành công.")
  }

  const handleRemove = (id) => {
    let newlist = todoList.filter(item => item.id !== id);
    localStorage.setItem('todoList', JSON.stringify(newlist))
    setTodoList(newlist)
    setTodoSearch(todoSearch.filter(item=> item.id !== id))
    toast.success("Xóa thành công.")
  }

  const handleEdit = (todo) => {
    // setIsSearch(false)
    setTodoEdit(todo)
  }

  const handleUpdate = (todo) => {
    if (todo.id) {
      let newlist = todoList.map(item => {
        if (item.id === todo.id) {
          return todo;
        }
        return item
      })
      localStorage.setItem('todoList', JSON.stringify(newlist));
      let newListSearch = todoSearch.map(item => {
        if (item.id === todo.id) {
          return todo;
        }
        return item
      })
      toast.success("Sửa thành công.")    
      if (isSearch) {
        setTodoEdit({});
        setTodoSearch(newListSearch);
        return
      }
    }
    setTodoEdit({});
    getTodoList()
  }

  const handleSearch = (todoSearch) => {
    if (!todoSearch) {
      setIsSearch(false)
      setTodoSearch([])
      getTodoList();
    } else {
      console.log(todoSearch);
      let searchResult = [...todoList]
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

      setTodoSearch(searchResult)
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

  const switchForm = () => {
    if (isSearch) {
      if (todoEdit.id) return <EditForm onUpdate={handleUpdate} todoEdit={todoEdit} />
      return <SearchForm onSearch={handleSearch}/>
    }
    if (todoEdit.id) return <EditForm onUpdate={handleUpdate} todoEdit={todoEdit} />
    
    return <AddForm onAdd={handleAdd}/>
  }
  
  return (
    <div className='container todo-app mx-auto w-[90%] lg:w-[850px]'>
      
      {switchForm()}

      <div className='flex justify-end'>
        <div
          className={`${ isSearch ? 'flex' : 'hidden' } flex mr-2 mt-5 px-3 py-2 text-gray-700`}
        >
          {isSearch && <h2>Tìm thấy "<i className='text-red-500 font-bold'>{todoSearch.length}</i>" kết quả.</h2>}
        </div>
        <button 
            onClick={() => {setIsSearch(true); setTodoEdit({})}}
            type='button'
            className={`${ isSearch ? 'hidden' : 'flex' } mr-2 justify-center items-center mt-5 rounded-md bg-blue-400 px-3 py-2 duration-500 hover:bg-blue-500 text-gray-700 hover:text-gray-800`}
        >
            Search <FaSearch className='ml-2'/>
        </button>
      </div>
      
      <div className='mt-5'>
        <Todo 
          onDelete={handleRemove} 
          isSearch={isSearch}
          onEdit={handleEdit} 
          todoList={isSearch ? todoSearch : todoList}
        />
      </div>

    </div>
  );
}

export default TodoList;