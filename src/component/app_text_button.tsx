interface AppTextButtonProps {
    text: string,
    onClick: () => void
}

export const AppTextButton: React.FC<AppTextButtonProps> = ({
    text,
    onClick
}) => {
    return (
        <h4
            className='font-bold text-slate-600 active:bg-slate-300 cursor-pointer select-none px-1'
            onClick={() => { onClick() }}
        >{text}</h4>
    )
}