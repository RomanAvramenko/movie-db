import React from 'react'

import NavBar from "../../components/NavBar/NavBar";
import Footer from '../../components/Footer/Footer';
import Detailed from '../../components/Detailed/Detailed';

export const InfoPage = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Detailed />
            <Footer />
        </React.Fragment>
    )
}