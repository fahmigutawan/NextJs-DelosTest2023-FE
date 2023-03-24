import { AppInput } from "@/component/app_input";
import { useEffect, useState } from "react";

export default function Login() {
    const [emailState, setEmailState] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')

    const [passwordState, setPasswordState] = useState('')
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    useEffect(() => {
        if (emailState.includes('@') && emailState.includes('.')) {
            setIsEmailError(false)
            setEmailErrorMessage('')
        } else {
            setIsEmailError(true)
            setEmailErrorMessage('Input the correct email format')
        }
    }, [emailState])

    useEffect(() => {
        if (passwordState.length < 8) {
            setIsPasswordError(true)
            setPasswordErrorMessage('Password must contains 8 characters or more')
        } else {
            setIsPasswordError(false)
            setPasswordErrorMessage('')
        }
    }, [passwordState])

    return (
        <div >
            <center>
                <div className='space-y-2'>
                    <AppInput
                        value={emailState}
                        onValueChange={(word) => {
                            setEmailState(word)
                        }}
                        placeHolder="Email"
                        isInputError={isEmailError}
                        errorMessage={emailErrorMessage}
                    />
                    <AppInput
                        value={passwordState}
                        onValueChange={(word) => {
                            setPasswordState(word)
                        }}
                        placeHolder="Password"
                        type={'password'}
                        isInputError={isPasswordError}
                        errorMessage={passwordErrorMessage}
                    />
                </div>
            </center>
        </div>
    )
}