import React from 'react'
import { MessageType, TempMessageProps } from '../../types'


const TempMessage = ({ type = MessageType.Success, message }: TempMessageProps): JSX.Element => {

  return (
    <div>
      <div className={`message ${type}`}>{message}</div>
    </div>
  )
}

export default TempMessage
