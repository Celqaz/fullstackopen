import React, { useImperativeHandle, useState } from 'react'

interface ToggleableProps {
    buttonLabel: string
    children: JSX.Element
    ref?: React.MutableRefObject<{toggleVisibility: () => void;} | undefined>
}

const Toggleable = React.forwardRef(({ buttonLabel, children }: ToggleableProps,ref): JSX.Element => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className={''}>
      <div  className={'mt-2 text-right'} style={hideWhenVisible}>
        <button className={'inline border-2 border-sky-300 hover:border-sky-500 rounded-xl px-2 my-2 hover:bg-blue-500 hover:text-gray-200'} onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div className={'relative my-4 shadow-sm border-2 rounded-md fill-current text-center'} style={showWhenVisible}>
        {children}
        <button className={'absolute bottom-4 right-1/4 border-2 border-blue-400 hover:bg-gray-50 rounded-2xl px-4 leading-7'} onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
)

Toggleable.displayName='ToggleableComponent'

export default Toggleable
