
const Header = () => {
    return (
        <header className="border-b border-white/10 bg-[#17212b] text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f16f5c] text-lg font-black text-[#17212b] shadow-lg shadow-[#f16f5c]/20">
                        A
                    </div>
                    <div>
                        <p className="text-lg font-bold tracking-tight">Focusboard</p>
                        <p className="text-xs text-slate-400">Small steps. Clear days.</p>
                    </div>
                </div>

                <div className="hidden items-center gap-3 text-sm text-slate-300 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-[#7ed6a6]" />
                    <span>Workspace active</span>
                </div>
            </div>
        </header>
    );
};

export default Header;