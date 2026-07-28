function Header() {
    return(
        <header className="flex justify-between items-center mb-4 bg-green-200 p-4 rounded">
            <h1 className="text-2xl font-bold">Notes Manager</h1>
            <label htmlFor="search" className="flex items-center gap-4">
                Search Notes:
                <input 
                    type="text" 
                    id="search" 
                    name="search"
                    className="border border-gray-300 rounded px-2 py-1 bg-white" 
                    placeholder="Search..." />
            </label>
        </header>
    )
}

export default Header;