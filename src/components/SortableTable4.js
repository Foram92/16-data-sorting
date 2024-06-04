import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Table from "./Table";

function SortableTable ( props ) {

    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const { config, data } = props;

    const handleClick = (label) => {
//this check is for if scroe was desc and then if u click on name, then name hasto sort as asc; so here if sortBy is already exist(ex:already clicke name) and if label and sortBy are not same(means clicked item is not name) then setOrder to asc, set that label and return it does not need below check 
        if(sortBy && label !== sortBy) {
            setSortOrder('asc');
            setSortBy(label);
            return;
        }

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
                <th className="cursor-pointer hover:bg-gray-100" onClick={() => handleClick(column.label)}>
                    <div className="flex items-center">
                        {getIcons(column.label, sortBy, sortOrder)}
                        {column.label}
                    </div>
                    
                </th>
            ),
        };
    })

    let sortedData = data;
    if (sortOrder && sortBy) {
        const { sortValue } =  config.find(column => column.label === sortBy);

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

    return <Table { ...props} data={sortedData} config={updatedConfig} />
}

function getIcons(label, sortBy, sortOrder) {
//if the label(want to show icon) and sortBy(label which want to sort) are not same then show both side icon, bcoz we are not sorting column
    if (label !== sortBy) {
        return <div>
            <GoTriangleUp />
            <GoTriangleDown />
        </div>;
    }
    if(sortOrder === null ){
        return <div>
            <GoTriangleUp />
            <GoTriangleDown />
        </div>;
    } else if (sortOrder === 'asc') {
        return <div>
            <GoTriangleUp />
        </div>;
    } else if (sortOrder === 'desc') {
        return <div>
            <GoTriangleDown />
        </div>;
    }
}

export default SortableTable;