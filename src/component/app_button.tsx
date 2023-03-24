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