const AuthButtons = props => (
    <div>
        {!props.user &&
      <button
        onClick={props.handleLogin}>
        Login
        </button> }
        {props.user &&
    <button
        onClick={props.handleLogout}>
        Logout
    </button>}
    </div>
  )
  
  export default AuthButtons