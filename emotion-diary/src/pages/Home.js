import React, { useContext, useState, useEffect } from 'react'
import MyHeader from 'src/components/MyHeader'
import MyButton from 'src/components/MyButton'
import { DiaryStateContext } from 'src/App'
import DiaryList from 'src/components/DiaryList'

const Home = () => {
  /**
   * states
   */
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState([]) // 전체 diaryList 중, curDate에 해당하는 데이터
  const [curDate, setCurDate] = useState(new Date())

  /**
   * effects
   */
  useEffect(() => {
    if (diaryList.length >= 1) {
      setData(
        diaryList.filter(
          (diaryItem) =>
            new Date(diaryItem.date).getFullYear() === curDate.getFullYear() &&
            new Date(diaryItem.date).getMonth() === curDate.getMonth()
        )
      )
    }
  }, [diaryList, curDate])

  /**
   * functions
   */
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
  }

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
  }

  return (
    <div className='Home'>
      <MyHeader
        leftChild={<MyButton text='<' onClick={decreaseMonth} />}
        headText={headText}
        rightChild={<MyButton text='>' onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home
