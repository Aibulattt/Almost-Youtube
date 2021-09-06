import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { DataContext } from '../../Context/DataContext';
import './Header.css';

export const HeaderM = () => {

    const { logout } = useContext(AuthContext);
    const { handleVideoSelect } = useContext(DataContext);

    const logoutHandler = () => {
        logout()
    }
    return (
        <>
            <div className='header container'>
                <img className='header__logo' src="src/Components/logo.svg" alt="logo" />
                <nav className='header__nav'>
                    <ul className='header__list'>
                        <li className='nav__item'>
                            <NavLink to='/Search' activeclassname='active'>Поиск</NavLink>
                        </li>
                        <li className='nav__item'>
                            <NavLink to='/Favourites' onClick={() => handleVideoSelect(null)} activeClassName='active'>Избранное</NavLink>
                        </li>
                    </ul>
                </nav>
                <Link className='header__btn-link' to='/'>
                    <button onClick={() => logoutHandler()} className='header__btn'>
                        Выйти
                    </button>
                </Link>
            </div>
        </>
    );
}