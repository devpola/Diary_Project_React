import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from 'src/App'
import MyButton from 'src/components/MyButton'
import MyHeader from 'src/components/MyHeader'
import { getStringDate } from 'src/utils/date'
import { emotionList } from 'src/constants/emotion'

const Diary = () => {
  /**
   * states
   */
  const { id } = useParams()
  const diaryList = useContext(DiaryStateContext)
  const [originData, setOriginData] = useState()

  /**
   * effects
   */
  const navigate = useNavigate()

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`
  }, [])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((diary) => parseInt(diary.id) === parseInt(id))

      if (targetDiary) setOriginData(targetDiary)
      else {
        alert('없는 일기입니다.')
        navigate('/', { replace: true })
      }
    }
  }, [id, diaryList])

  /**
   * functions
   */

  if (originData) {
    const curEmotinData = emotionList.find(
      (emotion) => parseInt(emotion.emotion_id) === parseInt(originData.emotion)
    )

    return (
      <div className='DiaryPage'>
        <MyHeader
          leftChild={<MyButton text='< 뒤로가기' onClick={() => navigate(-1)} />}
          headText={`${getStringDate(new Date(originData.date))} 기록`}
          rightChild={
            <MyButton text='수정하기' onClick={() => navigate(`/edit/${originData.id}`)} />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                'diary_img_wrapper',
                `emotion_img_wrapper_${curEmotinData.emotion_id}`,
              ].join(' ')}
            >
              <img src={curEmotinData.emotion_img} />
              <div className='emotion_descript'>{curEmotinData.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className='diary_content_wrapper'>
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  } else {
    return <div className='DiaryPage'>로딩중입니다...</div>
  }
}

export default Diary
