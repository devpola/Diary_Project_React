import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react'
import DiaryEditor from './components/DiaryEditor'
import DiaryList from './components/DiaryList'
import './App.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [action.data, ...state]
    case 'DELETE':
      return state.filter((diary) => diary.id !== action.data)
    case 'CHANGE':
      return state.map((diary) => {
        if (diary.id === action.data.id)
          return Object.assign({}, diary, { content: action.data.newContent })
        else return diary
      })
    default:
      return state
  }
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

function App() {
  /**
   * states
   */
  const [diaryList, dispatch] = useReducer(reducer, [])
  const diaryId = useRef(0)

  /**
   * effects
   */
  useEffect(() => {
    fetchData()
  }, [])

  /**
   * functions
   */
  // 현재, 일기 리스트 내의 특정 일기를 수정할 경우, 감정점수는 변경할 수 없기에 useMemo hook을 사용하여
  // 삭제나 추가가 아닌 경우(diaryList의 길이가 변하지 않는 경우)에는 getDiaryAnalysis 함수가 다시 호출 되지 않도록 한다.
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = diaryList.filter((diary) => diary.emotion >= 3).length
    const badCount = diaryList.length - goodCount
    const goodRatio = (goodCount / diaryList.length) * 100
    return { goodCount, badCount, goodRatio }
  }, [diaryList.length])

  // useMemo는 첫 번째 인자에 해당하는 함수의 return "값"을 반환하기 때문에, 상수로 사용해야함
  // *** useMemo => memoization 된 "값"을 반환
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis

  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) =>
      res.json()
    )

    const initData = res.slice(0, 20).map((data) => {
      return {
        id: diaryId.current++,
        author: data.email,
        content: data.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
      }
    })

    dispatch({ type: 'INIT', data: initData })
  }

  // DiaryList 컴포넌트 내의 수정 및 삭제 기능을 통해 App 컴포넌트 내의 diaryList state가 변경되었을 때도
  // App 컴포넌트가 리렌더링 되며 onCreate 함수도 다시 생성되어, 해당 함수를 prop으로 받는 DiaryEditor 까지 리렌더링 된다.
  // DiaryEditor에 onCreate 함수 그대로 전달해야 하는 상황에서, 최적화를 위해 "값"을 반환하는 useMemo를 사용할 수 x
  // *** useCallback => memoization 된 콜백함수를 반환
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: diaryId.current,
        created_date: new Date().getTime(),
        author,
        content,
        emotion,
      },
    })
    diaryId.current++

    // 의존성 배열이 비어있다면, onCreate는 diaryList가 빈 배열일 때에 생성되어,
    // 일기를 추가했을 때, 마지막으로 추가한 일기만이 diaryList에 남게 된다.
    // 이를 해결하기 위해 의존성 배열에 diaryList를 추가한다면,
    // 수정 전과 같이 DiryList 컴포넌트 내의 수정 및 삭제를 할 때마다 DiaryEditor 컴포넌트가 리렌더링된다.
    // 그렇기에, setDiaryList에 함수를 전달하여 "함수형 업데이트"를 하여, 최신 상태의 diaryList를 반영할 수 있도록 한다.
    // setDiaryList((diaryList) => [newDiaryItem, ...diaryList])

    // But, useReducer를 사용하여, dispatch하는 경우에는 고려하지 않아도 됨.
    // reducer에서 최신 상태의 diaryList state를 관리하고 이를 참조하여 새로운 state로 update하기 때문.
  }, [])

  const onDelete = useCallback((id) => {
    dispatch({ type: 'DELETE', data: id })
  }, [])

  const onChange = useCallback((id, newContent) => {
    dispatch({ type: 'CHANGE', data: { id, newContent } })
  }, [])

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onDelete, onChange }
  }, [])

  return (
    <DiaryStateContext.Provider value={diaryList}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className='App'>
          <DiaryEditor />
          <div>전체 일기 개수 : {diaryList.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio} %</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
