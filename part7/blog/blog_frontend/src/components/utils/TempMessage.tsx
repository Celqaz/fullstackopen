import React from 'react'
import { MessageType, TempMessageProps } from '../../types'
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai";

const TempMessage = ({ type = MessageType.Success, message }: TempMessageProps): JSX.Element => {

  return (
    <div className={`message ${type} border-2 border-dashed rounded bg-primary flex items-center pl-3 py-2 mt-4`}>
        <div className={'mr-3 text-2xl'}> {type === MessageType.Success ? <AiOutlineCheckCircle/>: <AiOutlineWarning/> }</div>
        <div>{message}</div>
    </div>
  )
}

export default TempMessage
