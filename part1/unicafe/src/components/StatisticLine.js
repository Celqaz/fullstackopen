import React from 'react';

export default function StatisticLine({text, value}) {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
