import React from 'react';

class Item extends React.Component{
    render(){
        return <div>This is the react APP</div>;
    }
}

export default Item;


// class MyComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: []
//         };
//     }

//     componentDidMount() {
//         fetch("./data")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     console.log('result\n', result);
//                     this.setState({
//                         isLoaded: true,
//                         items: result.locals.events,
//                     });
//                 },
//                 // Note: it's important to handle errors here
//                 // instead of a catch() block so that we don't swallow
//                 // exceptions from actual bugs in components.
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             )
//     }

//     render() {
//         const { error, isLoaded, items } = this.state;
//         if (error) {
//             return <div>Error: {error.message}</div>;
//         } else if (!isLoaded) {
//             return <div>Loading...</div>;
//         } else {
//             return (
//                 <ul>
//                     {items.map(item => (
//                         <li key={item.id}>
//                             {item.name} {item.price}
//                         </li>
//                     ))}
//                 </ul>
//             );
//         }
//     }
// }

// export default MyComponent;