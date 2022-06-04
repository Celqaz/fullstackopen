import React, {useState} from 'react';
import loginService from "../services/login.service";
import {AxiosError} from "axios";
import {LoginUserType} from "../types";

interface LoginFormProps {
    setUser:React.Dispatch<LoginUserType>
}

const LoginForm = ({setUser}:LoginFormProps): JSX.Element => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(event.target.value)
    }
    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value)
    }

    const formSubmitHandler= async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
try {
    const user = await loginService.login({username, password})
    setUser(user)
    console.log(user)
    setUsername('')
    setPassword('')
}catch (error) {
    if (error instanceof AxiosError){
        console.log(error.response?.data.error)
    }else if(error instanceof Error){
        console.log(error.message)
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
                            <label htmlFor={"username_input"}> username：
                                <input id={'username_input'} type={'text'} value={username} onChange={usernameChangeHandler}/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor={"password_input"}> password：
                                <input id={'password_input'} type={'password'} value={password} onChange={passwordChangeHandler}/>
                            </label>
                        </div>
                        <button type={'submit'}>Submit</button>
                    </form>
                </div>
            </fieldset>
        </div>
    );
};

export default LoginForm;
