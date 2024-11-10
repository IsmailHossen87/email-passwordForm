import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='max-w-4xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;