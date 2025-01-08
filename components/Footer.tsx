export default function Footer() {
    return (
        <footer className="bg-primary text-white text-center py-4">
            <p>© {new Date().getFullYear()} Gig Economy. <a target='_blank' className='underline' href="https://www.wilsonkinyua.com/">Wilson Kinyua</a></p>
        </footer>
    );
}