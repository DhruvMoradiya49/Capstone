import React, { useState } from 'react';
import "./Login.css";
import { Link } from "react-router-dom";
import {message} from 'antd'
import Axios from 'axios';
import constants from './constants';
import {Input,Form} from 'antd'

class Login extends React.Component {
    state={
        username:'',
        email:'',
        password:'',
        registerEmail:'',
        registerPassword:'',
        register:false,
    }    

    signIn = () => {
        Axios.post(constants.url.login, {
            identifier: this.state.email,
            password: this.state.password,
        }).then((res) => {
            window.localStorage.setItem("user", JSON.stringify(res.data.user))
            window.localStorage.setItem("token", JSON.stringify(res.data.jwt))
            this.props.history.push("/")
            this.setState({
                email:'',
                username:'',
                password:'',
            })
        }).catch((err) => {
            if (err) {
                message.error("Wrong Username & Password !")
            }
        })
    }

    register=()=>{
        Axios.post(constants.url.register, {
            email: this.state.registerEmail,
            password: this.state.registerPassword,
            username:this.state.username,
            blocked:false,
            confirmed:true
        }).then((response) => {
            if (response.data.length === 0) {
                message.error("Somthing went wrong")
            } else {
                message.success('Record successfully added')
                Axios.post(constants.url.cart_items,{
                    user:response.data.id,
                    products:[]
                },
                {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
            }
            this.setState({
                email:'',
                username:'',
                password:'',
                register:false
            })
        })

    }

    render(){
    return (
        <div className="login">
            <Link to='/'>
                <img className="login_logo" src="Images/logo.png" alt="logo" />
            </Link>

            <div className="login_container">
                <h1>Sign {this.state.register?"Up":'In'}</h1>
                {this.state.register?(
                    <Form onFinish={this.register}>
                        <h5>Your name</h5>
                        <Form.Item 
                            rules={[
                                {
                                    required:true,
                                    message:"Email is require!"
                                },
                                {
                                    type:'text',
                                    message:"Email is invalid!"
                                }
                            ]}
                        >
                            <Input type="text" value={this.state.username} onChange={e => this.setState({username:e.target.value})} />
                        </Form.Item>
                        <h5>E-mail</h5>
                        <Form.Item 
                            rules={[
                                {
                                    required:true,
                                    message:"Email is require!"
                                },
                                {
                                    type:'email',
                                    message:"Email is invalid!"
                                }
                            ]}
                        >
                            <Input type="email" value={this.state.registerEmail} onChange={e => this.setState({registerEmail:e.target.value})} />
                        </Form.Item>
                        <h5>password</h5>
                        <Form.Item
                            rules={[
                                {
                                    required:true,
                                    message:"Password is require!"
                                }
                            ]}
                        >
                            <Input type="password" value={this.state.registerPassword} onChange={e => this.setState({registerPassword:e.target.value})}/>
                        </Form.Item>
                        <button className="login_signInButton">Register</button>
                    </Form>
                ):(
                <Form onFinish={this.signIn}>
                    <h5>E-mail</h5>
                    <Form.Item 
                        rules={[
                            {
                                required:true,
                                message:"Email is require!"
                            },
                            {
                                type:'email',
                                message:"Email is invalid!"
                            }
                        ]}
                    >
                        <Input type="email" value={this.state.email} onChange={e => this.setState({email:e.target.value})} />
                    </Form.Item>
                    <h5>password</h5>
                    <Form.Item
                        rules={[
                            {
                                required:true,
                                message:"Password is require!"
                            }
                        ]}
                    >
                        <Input type="password" value={this.state.password} onChange={e => this.setState({password:e.target.value})}/>
                    </Form.Item>
                    <button className="login_signInButton">Sign In</button>
                </Form>
                )}
                <p>
                    By signing-in you agree to Mobiant's Conditions of Use & Sale.Please see our Privacy Notice, our Cookies Notice and out Interest-Based Ads
                </p>
                <button className="login_registerButton" onClick={()=>this.setState({register:!this.state.register})}>{!this.state.register?"Create your Mobiant Account":"Already have an account? Login"}</button>
            </div>
        </div>
    )
    }
}

export default Login
