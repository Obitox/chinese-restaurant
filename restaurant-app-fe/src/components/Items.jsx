import React, { Component } from 'react';

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class Items extends Component {
    render() {
        return (
            <div>
                <p>WELCOME TO ITEMS</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = {
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)