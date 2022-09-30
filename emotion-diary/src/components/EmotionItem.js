import React from 'react'

const EmotionItem = ({ item, onClick, isSelected }) => {
  return (
    <div
      className={[
        'EmotionItem',
        isSelected ? `EmotionItem_on_${item.emotion_id}` : 'EmotionItem_off',
      ].join(' ')}
      onClick={() => onClick(item.emotion_id)}
    >
      <img src={item.emotion_img} />
      <span>{item.emotion_descript}</span>
    </div>
  )
}

export default React.memo(EmotionItem)
