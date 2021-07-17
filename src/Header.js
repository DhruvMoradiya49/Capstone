import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from "react-router-dom";
import {Popover} from 'antd'

class Header extends React.Component {
    logout=()=>{
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        this.props.history.push('/login')
    }
    render(){
        return (
            <div className="header">
                <Link to="/">
                    <img className="header_logo" src="Images/logo.png" alt="logo" />
                </Link>
                <div className="header_search">
                    <input value={this.props.searchText} onChange={(e)=>this.props.setSearchText(e.target.value)} className="header_searchInput" type="text" />
                    <SearchIcon className="header_searchIcon"></SearchIcon>
                </div>

                <div className="header_nav">
                    <Link to='/login'>
                        <div className="header_option">
                            <span className="header_optionLineOne">
                            Hello
                            </span> 
                            <span className="header_optionLineTwo">
                                {window.localStorage.getItem('user')?(
                                <Popover content={(<div style={{cursor:'pointer'}} onClick={()=>this.logout()}>Logout</div>)}>
                                     {JSON.parse(window.localStorage.getItem('user')).username}
                                </Popover>
                                ):(
                                    <span>Guest</span>
                                )}
                            </span> 
                        </div>
                    </Link>

                    <div className="header_option">
                    <span className="header_optionLineOne">Returns</span> 
                    <span className="header_optionLineTwo">& Orders</span> 
                    </div>

                    <div className="header_option">
                    <span className="header_optionLineOne">Your</span> 
                    <span className="header_optionLineTwo">Plus+</span> 
                    </div>

                    <Link to="/checkout">
                        <div className="header_optionBasket">
                            <AddShoppingCartIcon></AddShoppingCartIcon>
                            <span className="header_optionLineTwo header_basketCount">{this.props.cartCount}</span>
                        </div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default Header;
