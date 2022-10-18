import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './Login.css';

export default function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(true)

    let navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()

        const user = {
            username: username,
            password: password
        }

        return axios.post('http://localhost:5000/login', {
            username: user.username,
            password: user.password
        })
            .then(res => {
                localStorage.setItem('usertoken', res.data)
                navigate('/uebersicht')
            })
            .catch(err => {
                console.error(err)
                setIsValid(false)
            })
            .catch(err => console.error(err))
    }

    return (
        <div class=" login-container">
            <div class="mb-5 loginCard">

                <div class="row">
                    <div class="col-12">
                        <h3 class="text-center mb-3"><b>Login</b></h3>
                    </div>
                </div>


                {!isValid &&
                    <div class="row justify-content-md-center">
                        <div class="col-md-auto ">
                            <div class="alert alert-danger incorrect" role="alert">
                                Username oder Passwort ist inkorrekt!
                            </div>
                        </div>
                    </div>
                }

                <div class="d-flex justify-content-center">
                    <form noValidate onSubmit={login}>

                        <div class="d-flex justify-content-center">
                            <input class="mb-2 ms-4" type="text" name="username" placeholder="Username" required value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>


                        <div class="d-flex justify-content-center">
                            <input class="mb-2 ms-4" type="password" name="password" placeholder="Passwort" required value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>


                        <div class="d-flex justify-content-center">

                            <button class="btnAnmelden btn btn-primary mb-2 ms-4" type="submit">
                                Anmelden
                            </button>

                        </div>
                        <div class="textForgot_password col-12 ms-2">
                            <a href="front/src/Login#">Passwort vergessen?</a>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
