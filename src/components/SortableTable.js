import Table from "./Table";

function SortableTable ( props ) {
//this will get config array from TablePage2
    const { config } = props;

    const handleClick = (label) => {
        console.log(label);
    }

//here we are not modify config, but we added a header to which had sortValue
    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
//if sortValue is not there then return column as it is
            return column;
        }

        return {
//but if it has sortValue then return column as it is and add header function to add new <th>
            ...column,
            header: () => (
                <th onClick={() => handleClick(column.label)}>
                    {column.label} SORTED
                </th>
            ),
        };
    })

// {...props also has config property but later added config={updatedConfig} will override prop's config}
    return <Table { ...props} config={updatedConfig} />
}

export default SortableTable;