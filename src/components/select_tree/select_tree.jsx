import { useState, useEffect, useRef } from 'react';
import './select_tree.css';
import Select from './select';
import Input from './input';
import Line from './line';
import PropTypes from 'prop-types';

function SelectTree({ treeInfo }) {
    const [info, setInfo] = useState(treeInfo);
    const [lines, setLines] = useState([]);
    const tableRef = useRef(null);

    const deleteRow = (rowIndex) => {
        if (info.length === 1) {
            alert('Cannot delete the last row');
            return;
        }
        const newInfo = info.filter((_, index) => index !== rowIndex);
        setInfo(newInfo);
    };

    const copyRow = (rowIndex, colIndex) => {
        const newInfo = [...info];
        let insertIndex = rowIndex + 1;
        while (newInfo[insertIndex] && newInfo[insertIndex][colIndex] === 0) {
            insertIndex++;
        }

        newInfo.splice(insertIndex, 0, [...newInfo[rowIndex]]);
        newInfo[insertIndex].splice(0, colIndex, ...newInfo[rowIndex].slice(0, colIndex).fill(0));

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
                // console.log(cell, rowIndex, colIndex);
                const select = cell.querySelector('select');
                const input = cell.querySelector('input');

                // 如果当前列是新行的起始列且值为0，找到不为0的列
                if (colIndex === 0 && info[rowIndex][colIndex] === 0) {
                    for (let j = 1; j < info[rowIndex].length; j++) {
                        if (info[rowIndex][j] !== 0) {
                            const targetCell = table.querySelector(`td[data-row="${rowIndex}"][data-col="${j}"]`);
                            if (targetCell) {
                                const targetPos = getRelativePosition(targetCell, table);
                                let roundBS = 1;

                                // 检查上一行同一列的值是否为0
                                for (let k = rowIndex - 1; k >= 0; k--) {
                                    if (info[k][j] === 0) {
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

                if (colIndex < info[rowIndex].length - 2) {
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
                        <tr key={i}>
                            {row.map((col, j) => (
                                <td key={j} data-row={i} data-col={j}>
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