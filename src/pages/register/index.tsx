import { AppButton } from "@/component/app_button"
import { AppInput } from "@/component/app_input"
import { AppTextButton } from "@/component/app_text_button"
import { AppContext } from "@/context/app_context"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

export default function Register() {
    const [emailState, setEmailState] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')

    const [passwordState, setPasswordState] = useState('')
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    const [nameState, setNameState] = useState('')
    const [isNameError, setIsNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState('')

    const router = useRouter()
    const myContext = useContext(AppContext)

    useEffect(
        () => {
            if (myContext.repository.getToken() !== '') {
                router.push('/home')
            }
        }, [])

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
                        value={nameState}
                        onValueChange={(word) => {
                            setNameState(word)
                        }}
                        placeHolder="Name"
                        isInputError={isNameError}
                        errorMessage={nameErrorMessage}
                    />
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
                    <AppButton
                        onClick={() => {
                            myContext
                                .repository
                                .login(emailState, passwordState)
                                .then((response) => { return response.json() })
                                .then((data) => {
                                    alert(data['meta']['message'])

                                    if(data['meta']['success']){
                                        myContext.repository.setToken(data['data']['token'])
                                        router.push('/home')
                                    }
                                })
                                .catch((error) => {
                                    alert(error)
                                })
                        }}
                        text={"Register"} />
                    <div className='flex justify-center space-x-1'>
                        <h4>Already have an account?</h4>
                        <AppTextButton
                            text="Login"
                            onClick={() => {
                                router.push('/login')
                            }} />
                    </div>
                </div>
            </center>
        </div>
    )
}