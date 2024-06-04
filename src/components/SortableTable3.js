import { useState } from "react";
import Table from "./Table";

function SortableTable ( props ) {

    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const { config, data } = props;

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

//only sort data if sortOrder & sortBy is not null
//make a copy of the 'data' prop
//find the correct sortValue function and use it for sorting

//take data from TablePage by props(watch after defination of useState) and svae it in sortedData
    let sortedData = data;
//check if sortOrder and sortBy is not null 
    if (sortOrder && sortBy) {
//get data from config(TablePage) which is equal to sortBy, and only get sortValue from it to sort that value(name or score)
        //const sortData =  config.find(column => column.label === sortBy);
        const { sortValue } =  config.find(column => column.label === sortBy);
//this is our sorting method, u can check sorting page
//here [...data] means we had taken all the data(name,color,score) to perform sorting so not only name or score will sort but whole row will sort with it
        sortedData = [...data].sort((a,b) => {
            const valueA = sortValue(a);
            const valueB = sortValue(b);

            const reverseOrder = sortOrder === 'asc' ? 1 : -1;

            if (typeof valueA == 'string') {
                return valueA.localeCompare(valueB) * reverseOrder;
            } else {
                return (valueA - valueB) * reverseOrder;
            }
        });
    }

    return (
        <div>
            {sortOrder} - {sortBy}
            <Table { ...props} data={sortedData} config={updatedConfig} />
        </div>
    )
}

export default SortableTable;