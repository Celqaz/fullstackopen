import React, {useState} from 'react';

interface ToggleableProps {
    buttonLabel: string
    children: JSX.Element
}

const Toggleable = ({buttonLabel, children}: ToggleableProps): JSX.Element => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
};

export default Toggleable;
