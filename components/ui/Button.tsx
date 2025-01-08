export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) {
    return (
        <button
            onClick={onClick}
            className="bg-primary text-white px-4 py-2 rounded-lg transition duration-300 uppercase"
        >
            {children}
        </button>
    );
}