import React from 'react'
import NavBar from "../../components/NavBar/NavBar";
import Footer from '../../components/Footer/Footer';
import { UserProfile } from '../../components/UserProfile/UserProfile';

export const UserPage = () => {
  return (
    <>
      <NavBar />
      <UserProfile />
      <Footer />
    </>
  )
}
