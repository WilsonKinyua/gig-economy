export default function Badge({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-primary text-white text-xs font-semibold uppercase rounded-full px-3 py-2">
            {children}
        </div>
    );
}