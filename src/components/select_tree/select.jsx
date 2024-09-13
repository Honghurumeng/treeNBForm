import PropTypes from 'prop-types';
import './select.css';

function Select({ showAddCopy, pos, copyRow }) {
    const handleCopy = () => {
        copyRow(pos.i, pos.j);
    }
    return (
        <div>
            <select
                className="select"
                placeholder="Select a person"
            >
            </select>
            {showAddCopy && (
                <div>
                    <button className='selectOptionBtn' onClick={handleCopy}>
                        Copy
                    </button>
                    {/* <button className='selectOptionBtn' onClick={() => alert('Added!' + pos.j)}>
                        Add
                    </button> */}
                </div>
            )}
        </div>
    );
}
Select.propTypes = {
    showAddCopy: PropTypes.bool,
    pos: PropTypes.object,
    copyRow: PropTypes.func,
};
export default Select;