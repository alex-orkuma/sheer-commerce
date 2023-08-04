import './Navigation.styles.scss'
import {Link, Outlet} from 'react-router-dom'
import { Fragment, useContext } from 'react'

import CartIcon from '../../cart-icon/cart-icon.component'
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg'
import CartDropdown from '../../cart-dropdown/cart-dropdown.component'


import { UserContext } from '../../../contexts/user.context'
import { CartContext } from '../../../contexts/cart.context'


import { SignOutUser } from '../../../utils/firebase.utils'


const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext)
    
    
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                </div>
                <div className='nav-links-container'>
                    <Link>
                        {currentUser ? (<span className='nav-link' onClick={SignOutUser}>SIGN OUT</span>):
                        (<Link className='nav-link' to='/auth'>
                        SIGN IN
                    </Link>)}
                    </Link>
                    <CartIcon/>
                </div>
                { isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;