const Footer = () => {
    return (
        <footer className="border-t border-[#d7d0c4] bg-linear-to-r from-[#f4f0e8] to-[#fffdf9] text-[#687078]">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
                <p>
                    <span className="font-semibold text-[#17212b]">Focusboard</span>
                    <span className="mx-2 text-[#c0b8aa]">/</span>
                    Built for one good day at a time.
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-[#9b9489]">© 2026 Angshu Saha</p>
            </div>
        </footer>
    );
};

export default Footer;