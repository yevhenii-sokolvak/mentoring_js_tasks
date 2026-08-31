import { CATEGORIES } from '../src/constants/CONSTANTS';

function FilterPanel({onFilter}) {


    return(
        <div>
            {CATEGORIES.map((category) => (
                <label 
                    className="inline-flex items-center gap-2 mr-4" 
                    key={category.replace(/\s+/g, "_").toLowerCase()}
                >
                    {category}
                    <input type="checkbox" name="category" value={category} onChange={() => onFilter(category)} />
                </label>
            ))}
        </div>
    )
}

export default FilterPanel;