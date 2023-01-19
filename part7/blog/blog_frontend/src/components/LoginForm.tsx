import React, {useState} from 'react'
import {AxiosError} from 'axios'
import {MessageType} from '../types'
//router
import blogsService from '../services/blogs.service'
import {useAppDispatch} from "../app/hooks";
import {displayNotification} from "../features/notificatonReducers";
import {userLogin} from "../features/userReducer";
import {useNavigate} from "react-router-dom";
import {AiOutlineUser, AiOutlineKey} from "react-icons/ai";

const LoginForm = (): JSX.Element => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

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
            // const user = await loginService.login({username, password})
            // setUser(user)
            const user = await dispatch(userLogin({username, password}))
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
            navigate('/')
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
        <div className={'bg-gradient-to-br from-cyan-500 to-blue-300 flex justify-center items-center w-screen h-screen'}>
            <div className={'hidden md:block px-10 py-6 mb-16'}>
                <img className={'w-60 h-60 object-cover object-center'} src="https://images.unsplash.com/photo-1674058195059-d71ab5223b9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt=""/>
            </div>
            <fieldset className={'bg-gray-100 mb-16 px-10 h-60 rounded-2xl shadow-xl'}>
                <h1 className={'text-2xl font-bold mt-8 mb-2 text-center'}>Login to Application</h1>
                <div>
                    <form className={'mt-4'} onSubmit={formSubmitHandler}>
                        <div className={'my-2'}>
                            <label className={'flex justify-center'} htmlFor={'username_input'}>
                                <span className={'mx-auto text-2xl'}><AiOutlineUser/></span>
                                <input className={''} id={'username_input'} type={'text'} value={username}
                                       placeholder={'Username'}
                                       onChange={usernameChangeHandler}/>
                            </label>
                        </div>
                        <div className={'my-2 focus:bg-red-300'}>
                            <label className={'flex justify-center'} htmlFor={'password_input'}>
                                <span className={'mx-auto text-2xl'}><AiOutlineKey/></span>
                                <input className={''} id={'password_input'} type={'password'} value={password} placeholder={'Password'}
                                       onChange={passwordChangeHandler}/>
                            </label>
                        </div>
                        <button
                            className={'block border-2 px-3 border-blue-400 bg-blue-400 text-gray-100 hover:bg-blue-500 rounded-2xl mx-auto mt-6'}
                            id={'login_button'} type={'submit'}>Submit
                        </button>
                    </form>
                </div>
            </fieldset>
        </div>
    )
}

export default LoginForm
