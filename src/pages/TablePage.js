import Table from '../components/Table';

function TablePage () {
//this is define as row, so with this we can't make table reusable, so we are using config
    const data = [
        {name: 'Orange', color:'bg-orange-500', score:5},
        {name: 'Apple', color:'bg-red-500', score:6},
        {name: 'Banana', color:'bg-yellow-500', score:2},
        {name: 'Kiwi', color:'bg-green-500', score:4},
    ]

//this is define as column, so we can use it to make reusable table
//label: defines heads 
//render: defines columns 
//header: optional fun to decide what to show in header with label
    const config = [
        {
            label: 'Name',
            render: (fruit) => fruit.name 
        },
        {
            label: 'color',
            //render: (fruit) => fruit.color
            render: (fruit) => <div className={`p-3 m-2 ${ fruit.color }`} />
        },
        {
            label: 'score',
            render: (fruit) => fruit.score,
            header: () => <th className='bg-red-500'>Score</th>
        }
    ]

    const keyFn = (fruit) => {
        return fruit.name;
    }

   return <Table data={data} config={config} keyFn={keyFn} />
}

export default TablePage;