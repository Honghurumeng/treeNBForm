import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './select_tree.css';
import Select from './select';
import Input from './input';
import Line from './line';
import PropTypes from 'prop-types';

function SelectTree({ treeInfo }) {
    // 为每一行添加唯一的 id
    const initializeTreeInfo = (treeInfo) => {
        return treeInfo.map(row => ({ id: uuidv4(), data: row }));
    };

    const [info, setInfo] = useState(initializeTreeInfo(treeInfo));
    const [lines, setLines] = useState([]);
    const tableRef = useRef(null);

    const deleteRow = (rowIndex) => {
        if (info.length === 1) {
            alert('Cannot delete the last row');
            return;
        }
        setInfo((prevInfo) => prevInfo.filter((_, index) => index !== rowIndex));
    };

    const copyRow = (rowIndex, colIndex) => {
        const newInfo = [...info];
        let insertIndex = rowIndex + 1;
        while (newInfo[insertIndex] && newInfo[insertIndex].data[colIndex] === 0) {
            insertIndex++;
        }

        const newRow = { id: uuidv4(), data: [...newInfo[rowIndex].data] };
        newRow.data.splice(0, colIndex, ...newInfo[rowIndex].data.slice(0, colIndex).fill(0));

        newInfo.splice(insertIndex, 0, newRow);

        setInfo(newInfo);
    };

    const getRelativePosition = (child, parent) => {
        const childRect = child.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        return {
            top: childRect.top - parentRect.top,
            left: childRect.left - parentRect.left,
        };
    };

    useEffect(() => {
        const newLines = [];
        const table = tableRef.current;
        if (table) {
            const cells = table.getElementsByTagName('td');
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const rowIndex = parseInt(cell.getAttribute('data-row'), 10);
                const colIndex = parseInt(cell.getAttribute('data-col'), 10);
                const select = cell.querySelector('select');
                const input = cell.querySelector('input');

                if (colIndex === 0 && info[rowIndex].data[colIndex] === 0) {
                    for (let j = 1; j < info[rowIndex].data.length; j++) {
                        if (info[rowIndex].data[j] !== 0) {
                            const targetCell = table.querySelector(`td[data-row="${rowIndex}"][data-col="${j}"]`);
                            if (targetCell) {
                                const targetPos = getRelativePosition(targetCell, table);
                                let roundBS = 1;

                                for (let k = rowIndex - 1; k >= 0; k--) {
                                    if (info[k].data[j] === 0) {
                                        roundBS++;
                                    } else {
                                        break;
                                    }
                                }

                                newLines.push({
                                    x: targetPos.left + 100,
                                    y: targetPos.top + 17,
                                    type: 'round',
                                    roundBS: roundBS
                                });
                            }
                            break;
                        }
                    }
                }

                if (colIndex < info[rowIndex].data.length - 2) {
                    if (select) {
                        const selectPos = getRelativePosition(select, table);
                        newLines.push({
                            x: selectPos.left + 100,
                            y: selectPos.top + 17,
                            type: 'line'
                        });
                    }
                    if (input) {
                        const inputPos = getRelativePosition(input, table);
                        newLines.push({
                            x: inputPos.left + 100,
                            y: inputPos.top + 17,
                            type: 'line'
                        });
                    }
                }
            }
        }
        setLines(newLines);
    }, [info]);

    return (
        <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }}>
                {lines.map((line, index) => (
                    <Line key={index} {...line} />
                ))}
            </svg>
            <table ref={tableRef}>
                <tbody>
                    {info.map((row, i) => (
                        <tr key={row.id}>
                            {row.data.map((col, j) => (
                                <td key={`${row.id}-${j}`} data-row={i} data-col={j}>
                                    {col === 1 && <Select showAddCopy pos={{ i, j }} copyRow={copyRow} />}
                                    {col === 2 && <Input />}
                                    {col === 3 && (
                                        <button onClick={() => deleteRow(i)}>
                                            Delete
                                        </button>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

SelectTree.propTypes = {
    treeInfo: PropTypes.array.isRequired,
};

export default SelectTree;