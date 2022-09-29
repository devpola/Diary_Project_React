import './App.css'
import React, { useReducer, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      const newItem = {
        ...action.data,
      }
      newState = [newItem, ...state]
      break
    case 'REMOVE':
      newState = state.filter((item) => item.id !== action.targetId)
      break
    case 'EDIT':
      newState = state.map((item) => (item.id === action.data.id ? action.data : item))
      break
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = React.createContext() // diary state를 공급할 context
export const DiaryDispatchContext = React.createContext() // diary state 관리할 dispatch 관련 context

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1',
    date: 1662448282538,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2',
    date: 1662448282539,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3',
    date: 1662448282540,
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0)

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
    dataId.current += 1
  }

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId })
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
