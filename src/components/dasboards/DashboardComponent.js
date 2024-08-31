import React, { Component } from 'react';

import AdminDashboard from './eventAdmin/AdminDashboard';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissionArray: [],
            isPasswordResetModal: false
        }
    }

    componentDidMount() {
        this.setState({ permissionArray: localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : [] });
    }

    render() {
        return (
            <>
                <AdminDashboard/>
            </>
        );
    }
}

export default DashboardComponent;