import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from 'src/App'
import DiaryEditor from 'src/components/DiaryEditor'

const Edit = () => {
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
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((diary) => parseInt(diary.id) === parseInt(id))

      if (targetDiary) setOriginData(targetDiary)
      else navigate('/', { replace: true })
    }
  }, [id, diaryList])

  return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>
}

export default Edit
