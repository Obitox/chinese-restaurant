import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import Users from './Users.jsx';
import Items from './Items.jsx';

import { fetchUsers } from '../actions/adminDashboard'

// STYLING
import Button from '@material-ui/core/Button';

class AdminDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            Users: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){
        const response = await fetch(`http://localhost:3000/csrf`, {
                                    method: 'POST',
                                    credentials: 'include'
                                });
        // FIXME: Fix this naming
        const json = await response.json();
        // this.setState({ csrf_token: json._RequestAntiForgeryToken });
        console.log(json);                        

        const payload = {
            _RequestAntiForgeryToken: json._RequestAntiForgeryToken
        }

        console.log(payload);
        this.props.fetchUsers(payload._RequestAntiForgeryToken);

        // const responseUsers = await fetch(`http://localhost:3000/users`, {
        //                             method: 'POST',
        //                             credentials: 'include',
        //                             headers: {
        //                                 // 'Accept': 'application/json',
        //                                 // 'Content-Type': 'application/json',
        //                             },
        //                             body: JSON.stringify(payload)
        //                         });

        // const jsonUsers = await responseUsers.json();
        // this.setState({['Users']: jsonUsers})                        

        // fetch(`http://localhost:3000/csrf`, {
        //     method: 'POST',
        //     credentials: 'include',
        //     body: JSON.stringify(payload)
        //  })
        //  .then(res => res.json())
        //  .then(response => {
        //     this.setState({
        //         csrf_token: response._RequestAntiForgeryToken
        //     });
        // });

        

        // fetch(baseURL + '/users', {
        //     method: 'POST',
        //  //    mode: 'cors',
        //  //    headers: {
        //  //        'Content-Type': 'application/json',
        //  //        // 'Content-Type': 'application/x-www-form-urlencoded',
        //  //     },
        //      body: JSON.stringify(payload),
        //      credentials: 'include'
        //  })
        // .then(res => res.json())
        // .then(response => {
        //     if(response.length > 0){
        //         dispatch(usersSuccess(response))
        //     } else {
        //     }
        // })
        // .catch(error => dispatch(usersFailed(error)));

        // this.props.fetchUsers(this.state.csrf_token);
    }
    
    render() {
        // const isUsers = this.state.isUsers;
        // const isItems = this.state.isItems;

        // let component = null;

        // if(isUsers && !isItems){
        //     component = <Users />
        // }
        // else if(isItems && !isUsers) {
        //     component = <Items />
        // }
        // else {
        //     component =  (
        //         <div>
        //             <Button onClick={this.handleUsers("isUsers")} color="primary">
        //                 Maintain users
        //             </Button>
        //             <Button name="isItems" onClick={this.handleItems("isItems")} color="primary">
        //                 Maintain items
        //             </Button>
        //         </div>
        //     )
        // }
        // console.log(this.props.Users);

        const {
            Users,
            IsFetching
        } = this.props;

        if(IsFetching){
            return <div>Loading</div>;
        }
        return (
            <div>
                <Link to={`${this.props.match.url}/users`}>Maintain users</Link>
                <Link to={`${this.props.match.url}/items`}>Maintain items</Link>
                {/* component={(props) => <Users {...props} Message={"HELLO"}/>} */}
                {/* <Route path={`${this.props.match.path}/users`}  render={(props) => <Users {...props} Users={this.state.Users}/>}/> */}
                <Route path={`${this.props.match.path}/users`} component={Users} />
                <Route path={`${this.props.match.path}/items`} component={Items} />
                <Route
                    exact
                    path={this.props.match.path}
                    render={() => <h3>Please select a topic.</h3>}
                />
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        Users: state.usersReducer.Users,
        IsFetching: state.usersReducer.IsFetching
    };
}

const mapDispatchToProps = {
    fetchUsers,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)


// const AdminDashboard = ({match}) => {
//     constructor(){

//     }

//     return (
//         <div>

//             <Link to={`${match.url}/users`}>Maintain users</Link>
//             <Link to={`${match.url}/items`}>Maintain items</Link>

//             <Route path={`${match.path}/users`} component={(props) => <Users {...props} Message={"HELLO"}/>} />
//             <Route path={`${match.path}/items`} component={Items} />
//             <Route
//                 exact
//                 path={match.path}
//                 render={() => <h3>Please select a topic.</h3>}
//             />
//         </div>
//     );
// };

// const mapStateToProps = (state) => {
//     return {
//     };
// }

// const mapDispatchToProps = {
//     push
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)



// class AdminDashboard extends Component {
//     redirectToUsers = () => {
//         let path = `/users`;
//         this.props.push(path);
//     }

//     redirectToItems = () => {
//         let path = `/items`;
//         this.props.push(path);
//     }

//     render() {
//         return (
//             <div>
//                 <Button variant="outlined" onClick={this.redirectToUsers}>
//                     Maintain users
//                 </Button>
//                 <Button variant="outlined" onClick={this.redirectToItems}>
//                     Maintain items
//                 </Button>
//                 <Route path="/users" component={(props) => <Users {...props} Message={"HELLO"}/>} />
//                 <Route path="/items" component={Items} />
//             </div>
//         );
//     }
// }