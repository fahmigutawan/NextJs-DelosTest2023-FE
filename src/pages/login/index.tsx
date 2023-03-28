import { AppButton } from "@/component/app_button";
import { AppInput } from "@/component/app_input";
import { AppTextButton } from "@/component/app_text_button";
import { AppContext } from "@/context/app_context";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Login() {
    const [emailState, setEmailState] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')

    const [passwordState, setPasswordState] = useState('')
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    const router = useRouter()
    const myContext = useContext(AppContext)

    useEffect(
        () => {
            if (myContext.repository.getLoginState() === 'true') {
                router.push('/home?page=1')
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
        <div className='flex min-h-screen items-center justify-center'>
            <Head>
                <title>DelosNews | Login</title>
            </Head>
            <div className='space-y-2 flex flex-col items-center'>
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
                        myContext.repository.login(
                            emailState,
                            passwordState,
                            async () => {
                                alert('Login succeeded')
                                myContext.repository.setLoginState('true')
                                myContext.repository.setEmail(emailState)
                                await router.push('/home?page=1')
                            },
                            (error) => {
                                alert(error)
                            }
                        )
                    }}
                    text={"Login"} />
                <div className='flex justify-center space-x-1'>
                    <h4>Dont have account?</h4>
                    <AppTextButton
                        text="Register"
                        onClick={() => {
                            router.push('/register')
                        }} />
                </div>
            </div>
        </div>
    )
}