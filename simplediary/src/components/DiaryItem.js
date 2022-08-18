import React, { useState, useRef, useContext } from 'react'
import { DiaryDispatchContext } from '../App'
import useChangeValue from '../hooks/useChangeValue'

const DiaryItem = ({ data }) => {
  /**
   * states
   */
  const [isClicked, setIsClicked] = useState(false)
  const [content, onChangeContent] = useChangeValue(data.content)

  /**
   * functions
   */
  const contentEditInput = useRef()

  const { onDelete, onChange } = useContext(DiaryDispatchContext)

  const toggleIsClicked = () => setIsClicked(!isClicked)

  const handleDelete = () => {
    if (window.confirm('해당 일기를 정말 삭제하시겠습니까?')) onDelete(data.id)
  }

  const handleEdit = () => {
    if (contentEditInput.length < 5) {
      contentEditInput.current.focus()
      return
    }
    if (window.confirm('해당 일기를 수정하시겠습니까?')) {
      onChange(data.id, content)
      toggleIsClicked()
    }
  }

  return (
    <div className='diary-item'>
      <div className='item-info'>
        <span>
          작성자 : {data.author} | 감정 점수 : {data.emotion}
        </span>
        <br />
        <span className='item-date'>{new Date(data.created_date).toLocaleString()}</span>
      </div>
      {isClicked ? (
        <div>
          <textarea ref={contentEditInput} value={content} onChange={onChangeContent} />
        </div>
      ) : (
        <div className='item-content'>{data.content}</div>
      )}
      {isClicked ? (
        <div>
          <button onClick={toggleIsClicked}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </div>
      ) : (
        <div>
          <button onClick={handleDelete}>삭제 하기</button>
          <button onClick={toggleIsClicked}>수정 하기</button>
        </div>
      )}
    </div>
  )
}

export default React.memo(DiaryItem)
