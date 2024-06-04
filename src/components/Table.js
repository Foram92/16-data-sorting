import { Fragment } from "react";
//we want to apply key in column.header(), but we can't apply it to TablePage, bcoz we don't want other devloper to worry about key and here we also can't apply key bcoz we don't have any tag element and we can't put any tag, so we are using Fragment

//we can do this with Echo fun but there's short method is import Fragment and use it
// function Echo ({ children }) {
//     return children;
// }

function Table ({ data, config, keyFn }) {

    const renderdHeads = config.map((column) => {
        if(column.header) {
            //return <Echo key={column.label}>{column.header()}</Echo> //when use Echo
            return <Fragment key={column.label}>{column.header()}</Fragment>
        }

        return <th key={column.label}>{column.label}</th>
    });

    const renderedRows = data.map((rowData) => {

//to make it reusable we use nested map() this goes to each config to take render fun 
        const renderdCells = config.map((column) => {
            return <td className="p-3" key={column.label}>{ column.render(rowData) }</td>
        })
        return (
            <tr className="border-b" key={ keyFn(rowData) }>
                {/* <td className="p-3">{ fruit.name }</td>
                <td className="p-3">
                    <div className={`p-3 m-2 ${fruit.color}`}></div>
                </td>
                <td className="p-3">{ fruit.score }</td> */}

{/* goes to each config's render function with fruit object and get from there fruit.name, fruit.color, fruit.score and put it here to show; but it is still not for reusable so we use nested map(above renderedCells) */}
                {/* <td className="p-3">{ config[0].render(fruit) }</td>
                <td className="p-3">{ config[1].render(fruit) }</td>
                <td className="p-3">{ config[2].render(fruit) }</td> */}
                { renderdCells }
            </tr>
        );
    })
    return (
        <table className="table-auto border-spacing-2">
            <thead>
                <tr className="border-b-2">
                    {/* <th>Fruit</th>
                    <th>Color</th>
                    <th>Score</th> */} 
                    {/* instead of above code we set below to make it reusable */}
                    {renderdHeads}
                </tr>
            </thead>
            <tbody>
                { renderedRows }
            </tbody>
        </table>
    );
}

export default Table;