function Button({children, onClick, style}) {
    return (
        <button className={"bg-blue-300 py-2 px-10 rounded-lg text-white font-bold "+style} onClick={onClick}>{children}</button>
    )
}

export default Button
