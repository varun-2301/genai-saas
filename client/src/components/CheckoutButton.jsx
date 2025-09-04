export const CheckoutButton = ({ children = "Upgrade to Pro", className = "", handleClick, loading=false }) => {
    return (
        <button onClick={handleClick} className={`${className} ${!loading ? 'cursor-pointer' : ''}`} disabled={loading}>
            {children}
        </button>
    )
}
