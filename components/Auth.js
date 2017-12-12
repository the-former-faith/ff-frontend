import React from 'react'
import AuthButtons from './AuthButtons'
import { firebaseLogin, firebaseLogout, firebaseUser } from '../firebase/auth'
import { setTimeout } from 'timers';

class Auth extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {}
        }
        this.handleUser()
    }
    componentDidMount() {
        setTimeout(() => {
            console.log('yayayay')
            this.handleUser()
            this.props.updateUser('bar')
        }, 500)
    }
    async handleLogin() {
        await firebaseLogin()
        const user = await firebaseUser()
        this.setState({ user })
    }
    async handleLogout() {
        await firebaseLogout()
        const user = await firebaseUser()
        this.setState({ user })
    }
    async handleUser() {
        const user = await firebaseUser()
        this.setState({ user })
        this.props.updateUser(user)
    }
    render() {
        return (
            <div>
                <AuthButtons
                    user={this.state.user.uid}
                    handleLogout={this.handleLogout.bind(this)}
                    handleLogin={this.handleLogin.bind(this)}
                    handleUser={this.handleUser.bind(this)}
                />
            </div>
        )
    }
}

export default Auth