export default function Card({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-white shadow-md border border-gray-300 rounded-lg p-4 hover:shadow-lg transition duration-300">
            {children}
        </div>
    );
}