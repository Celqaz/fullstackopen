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
    <div className={'toggleDiv'}>
      <div  className={'showContentButton'} style={hideWhenVisible}>
        <button  onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div className={'hideContentButton'} style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
)

Toggleable.displayName='ToggleableComponent'

export default Toggleable
