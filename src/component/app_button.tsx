interface AppButtonProps {
    onClick: () => void;
    text: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
    text,
    onClick
}) => {
    return (
        <div>
            <button
                className='bg-slate-600 text-white px-3 py-2 rounded-xl max-w-xl hover:bg-slate-500 active:scale-95 transition-transform'
                onClick={() => { onClick() }}
            >{text}</button>
        </div>
    )
}

export const AppRedButton: React.FC<AppButtonProps> = ({
    text,
    onClick
}) => {
    return (
        <div>
            <button
                className='bg-red-500 text-white px-3 py-2 rounded-xl max-w-xl hover:bg-red-300 active:scale-95 transition-transform'
                onClick={() => { onClick() }}
            >{text}</button>
        </div>
    )
}