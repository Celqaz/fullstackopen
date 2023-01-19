import React, {useState} from "react";

export const useField = (type: string) => {
    const [value, setValue] = useState<string>('')

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const clearValue = ()=>{
        setValue('')
    }

    return {type, value, onChange,clearValue}
}
