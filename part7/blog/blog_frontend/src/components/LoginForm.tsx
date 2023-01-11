import React, {useState} from 'react'
import loginService from '../services/login.service'
import {AxiosError} from 'axios'
import {UserType, MessageType} from '../types'
//router
import blogsService from '../services/blogs.service'
import {useAppDispatch} from "../app/hooks";
import {displayNotification} from "../features/notificatonReducers";

interface LoginFormProps {
    setUser: React.Dispatch<UserType>
    // setMessageObj: React.Dispatch<React.SetStateAction<TempMessageProps | null>>
}

const LoginForm = ({setUser}: LoginFormProps): JSX.Element => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            setUser(user)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogsService.setToken(user.token)
            setUsername('')
            setPassword('')
            // setMessageObj({
            //   message: 'Successfully log in.'
            // })
            // dispatch(setNotification({
            //     message: 'Successfully log in.'
            // }))
            dispatch(displayNotification({message: 'Successfully log in.'}))

        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(displayNotification(
                        {type: MessageType.Failure, message: error.response?.data.error}
                    )
                )
            } else if (error instanceof Error) {
                dispatch(displayNotification(
                        {type: MessageType.Failure, message: error.message}
                    )
                )
            }
        }
    }
    return (
        <div>
            <fieldset>
                <h1>Login to Application</h1>
                <div>
                    <form onSubmit={formSubmitHandler}>
                        <div>
                            <label htmlFor={'username_input'}> username：
                                <input id={'username_input'} type={'text'} value={username}
                                       onChange={usernameChangeHandler}/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor={'password_input'}> password：
                                <input id={'password_input'} type={'password'} value={password}
                                       onChange={passwordChangeHandler}/>
                            </label>
                        </div>
                        <button id={'login_button'} type={'submit'}>Submit</button>
                    </form>
                </div>
            </fieldset>
        </div>
    )
}

export default LoginForm
