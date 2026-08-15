import FilterPanel from './FilterPanel'

function Header({ onSearch }) {
    return(
        <header className="flex flex-col mb-4 bg-green-200 p-4 rounded">
            <div className="flex flex-col justify-between items-center gap-2 md:flex-row">
                <h1 className="text-2xl font-bold">Notes Manager</h1>
                <label className="flex items-center gap-4">
                    Search Notes:
                    <input 
                        type="text" 
                        id="search" 
                        name="search"
                        onChange={(e) => onSearch(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 bg-white" 
                        placeholder="Search..." />
                </label>
            </div>
            <FilterPanel />
        </header>
    )
}

export default Header;