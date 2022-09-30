import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from 'src/App'
import MyButton from 'src/components/MyButton'
import MyHeader from 'src/components/MyHeader'
import { getStringDate } from 'src/utils/date'
import EmotionItem from './EmotionItem'
import { emotionList } from 'src/constants/emotion'

const DiaryEditor = ({ isEdit, originData }) => {
  /**
   * states
   */
  const [date, setDate] = useState(getStringDate(new Date()))
  const [emotion, setEmotion] = useState(3)
  const [content, setContent] = useState('')

  /**
   * effects
   */
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData])

  const navigate = useNavigate()
  const contentRef = useRef()

  /**
   * functions
   */
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext)
  const handleClickEmotion = useCallback((emotion) => setEmotion(emotion), [])

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus()
      return
    }

    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?')) {
      if (isEdit) onEdit(originData.id, date, content, emotion)
      else onCreate(date, content, emotion)
    }

    navigate('/', { replace: true }) // home으로 이동한 후, 뒤로가기로 다시 돌아오는 것을 방지
  }

  const handleRemove = () => {
    if (window.confirm('일기를 삭제하시겠습니까?')) {
      onRemove(originData.id)
      navigate('/', { replace: true })
    }
  }

  return (
    <div className='DiaryEditor'>
      <MyHeader
        leftChild={<MyButton text='< 뒤로가기' type='default' onClick={() => navigate(-1)} />}
        headText={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
        rightChild={isEdit && <MyButton text='삭제하기' type='negative' onClick={handleRemove} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type='date'
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((item) => (
              <EmotionItem
                key={item.emotion_id}
                item={item}
                onClick={handleClickEmotion}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton text='취소하기' onClick={() => navigate(-1)} />
            <MyButton text='작성완료' type='positive' onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor
