import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/User';
import Footer from '../components/Footer';
import { getLoginUser } from '../../utils/utils'
import '../css/login.css'

export default function Login() {
    const { user, setUser } = useContext(UserContext)
    const [loginUser, setLoginUser] = useState("")
    const [hasAccount, setHasAccount] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();

        getLoginUser(loginUser)
                .then((data) => {
                    if(data.user) {
                        setUser(data.user.username)
                        setHasAccount(true)
                    }
                })
                .catch((err) => {
                    setHasAccount(false)
                })
            }    

    return (
        <>
        <main id="login_page">
            <div className='login_wrapper'>
                <h1>Ubiquitous Biscuits</h1>
                <div className='login_container'>
                <form id="login_form" onSubmit={handleLogin}>
                    <label className='username_label required' for="username">Username</label>
                    <input
                        value={loginUser}
                        id="username"
                        type="text"
                        onChange={(e)=>{
                            setLoginUser(e.target.value)
                        }}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {
                (hasAccount===false)? <div className='login_message not_existing_user'>Cannot find the user with username. Please signup to join our community.</div>
                 : (hasAccount===true)? <div className='login_message'>Thank you.<br/>you can now return to the previous page.</div>
                 : <></>
                 }
                <Link to="/registration" className="link_signup">New to our site? Please sign up to join the community!</Link>
                <Link to="/" className="back_to_home" onClick={()=>setHasAccount("")}>return to home</Link>
            </div>
            </div>
        </main>
        <Footer />
        </>
    )
}