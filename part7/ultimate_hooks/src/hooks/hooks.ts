import React, {useEffect, useState} from "react";
import axios from "axios";

const useField = (type: string) => {
    const [value, setValue] = useState('')

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}


const useResource = (baseUrl: string) => {
    const [resources, setResources] = useState([])

    // ...
    console.log('useResource Hook')
    useEffect(() => {
        axios.get(baseUrl)
            .then(response => {
                console.log('res Hook', response.data)
                setResources(response.data)
            })
    }, [baseUrl])
    const create = async (newContent: {}) => {
        const response = await axios.post(baseUrl, newContent)
        return response.data
    }

    const service = {
        create,
    }

    return [
        resources, service
    ] as const
}


export {
    useField,
    useResource
}
