import { ChangeEventHandler, useEffect, useState } from "react";

type AppInputProps = {
    value: string | number | readonly string[] | undefined;
    onValueChange: (word: string) => void;
    type?: string,
    placeHolder: string;
    isInputError?: boolean;
    errorMessage?: string;
    maxWidth?: string,
    onKeyDown?:(event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const AppInput: React.FC<AppInputProps> = ({
    value,
    onValueChange,
    placeHolder,
    isInputError,
    errorMessage,
    maxWidth = 'xl',
    type = 'text',
    onKeyDown
}) => {
    const [isFirstTime, setIsFirstTime] = useState(true)
    return (
        <div className={'max-w-' + maxWidth + ' space-y-2 '}>
            <input
                autoComplete="off"
                className='shadow-sm rounded-xl px-3 py-2 border border-gray-400 min-w-full'
                type={type}
                value={value}
                onChange={(e) => {
                    onValueChange(e.target.value)
                    setIsFirstTime(false)
                }}
                placeholder={placeHolder}
                onKeyDown={(e) => {
                    if(typeof(onKeyDown)!=='undefined'){
                        onKeyDown(e)
                    }
                }}
            />
            {
                isFirstTime ?
                    <></>
                    :
                    isInputError ?
                        <div className='border-l-4 border-red-700 bg-red-300 px-3 py-2 text-left'>
                            <h3 className='font-bold'>Warning</h3>
                            <body>{errorMessage}</body>
                        </div>
                        :
                        <></>
            }
        </div>
    )
}