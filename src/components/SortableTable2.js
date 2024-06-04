import { useState } from "react";
import Table from "./Table";

function SortableTable ( props ) {

//this useState is for what order(asc or desc or none) we will set
    const [sortOrder, setSortOrder] = useState(null);

//this useState is to know what column(name or score) we will click to sort
    const [sortBy, setSortBy] = useState(null);

    const { config } = props;

//if sortOrder is null then by click set it as asc and give the name of what label clicked if.....
    const handleClick = (label) => {
        if(sortOrder === null) {
            setSortOrder('asc');
            setSortBy(label);
        } else if (sortOrder === 'asc') {
            setSortOrder('desc');
            setSortBy(label);
        } else if (sortOrder === 'desc') {
            setSortOrder(null);
            setSortBy(null);
        }
    }

    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        }

        return {
            ...column,
            header: () => (
                <th onClick={() => handleClick(column.label)}>
                    {column.label} SORTED
                </th>
            ),
        };
    })

    return (
        <div>
            {sortOrder} - {sortBy}
            <Table { ...props} config={updatedConfig} />
        </div>
    )
}

export default SortableTable;