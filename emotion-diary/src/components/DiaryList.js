import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DiaryItem from './DiaryItem'
import MyButton from './MyButton'

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
]

const emotionOptionList = [
  { value: 'all', name: '전부다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만' },
]

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className='ControlMenu' value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((option, index) => (
        <option value={option.value} key={index}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

const DiaryList = ({ diaryList }) => {
  /**
   * states
   */
  const [sortType, setSortType] = useState('latest')
  const [emotionType, setEmotionType] = useState('all')

  /**
   * effects
   */
  const navigate = useNavigate()

  /**
   * functions
   */
  const getSortedDiaryList = () => {
    const copiedList = diaryList.slice()

    // 감정에 따른 필터링
    const filteredList = copiedList.filter((item) => {
      if (emotionType === 'all') return item
      else if (emotionType === 'good') return parseInt(item.emotion) <= 3
      else return parseInt(item.emotion) > 3
    })

    // 필터링 된 리스트를 정렬 타입에 따라 정렬
    return filteredList.sort((a, b) => {
      if (sortType === 'latest') return parseInt(b.date) - parseInt(a.date)
      else return parseInt(a.date) - parseInt(b.date)
    })
  }

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu
            value={emotionType}
            onChange={setEmotionType}
            optionList={emotionOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton type='positive' text='새 일기 쓰기' onClick={() => navigate('/new')} />
        </div>
      </div>
      {getSortedDiaryList().map((item) => (
        <DiaryItem key={item.id} item={item} />
      ))}
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList
