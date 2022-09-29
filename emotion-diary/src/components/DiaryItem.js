import { useNavigate } from 'react-router-dom'
import MyButton from './MyButton'

const DiaryItem = ({ item }) => {
  /**
   * effects
   */
  const navigate = useNavigate()

  /**
   * functions
   */
  const dateText = new Date(parseInt(item.date)).toLocaleDateString()

  const goDetail = () => {
    navigate(`/diary/${item.id}`)
  }

  const goEdit = () => {
    navigate(`/edit/${item.id}`)
  }

  return (
    <div className='DiaryItem'>
      <div
        className={['emotion_img_wrapper', `emotion_img_wrapper_${item.emotion}`].join(' ')}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${item.emotion}.png`} />
      </div>
      <div className='item_wrapper' onClick={goDetail}>
        <div className='item_date'>{dateText}</div>
        <div className='item_content'>{item.content.slice(0, 25)}</div>
      </div>
      <div className='btn_wrapper'>
        <MyButton text='수정하기' onClick={goEdit} />
      </div>
    </div>
  )
}

export default DiaryItem
