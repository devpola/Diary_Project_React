import React, { useContext, useRef } from 'react'
import { DiaryDispatchContext } from '../App'
import useChangeValue from '../hooks/useChangeValue'

const DiaryEditor = () => {
  /**
   * states
   */
  const authorInput = useRef()
  const contentInput = useRef()
  const [author, onChangeAuthor] = useChangeValue('')
  const [content, onChangeContent] = useChangeValue('')
  const [emotion, onChangeEmotion] = useChangeValue(1)

  /**
   * functions
   */
  const { onCreate } = useContext(DiaryDispatchContext)

  const handleSubmit = () => {
    if (author.length < 1) {
      authorInput.current.focus()
      return
    }
    if (content.length < 5) {
      contentInput.current.focus()
      return
    }
    onCreate(author, content, emotion)
    alert('저장 성공')
  }

  return (
    <div className='diary-editor'>
      <h2>오늘의 일기</h2>
      <div>
        <input ref={authorInput} value={author} type='text' onChange={onChangeAuthor} />
      </div>
      <div>
        <textarea ref={contentInput} value={content} type='text' onChange={onChangeContent} />
      </div>
      <div>
        <select value={emotion} onChange={onChangeEmotion}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  )
}

export default DiaryEditor
