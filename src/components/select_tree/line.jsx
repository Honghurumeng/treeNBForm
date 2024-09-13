import PropTypes from 'prop-types';

function Line({ x, y, type, roundBS }) {
    if (!roundBS) {
        roundBS = 1;
    }
    return (
        <>
            {type === 'line' ? (
                <svg style={{ position: 'absolute', pointerEvents: 'none' }}>
                    <line x1={x} y1={y} x2={x + 200} y2={y} stroke="black" strokeWidth="2" />
                </svg>
            ) : type === 'round' ? (
                <svg style={{ position: 'absolute', pointerEvents: 'none' }}>
                    <polyline
                        points={`${x},${y} ${x - 110},${y} ${x - 110},${y - 63 * roundBS}`}
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            ) : null}
        </>
    );
}

Line.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    roundBS: PropTypes.number,
};

export default Line;