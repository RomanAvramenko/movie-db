import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { UserProfileContainer } from "../../components/UserProfile/UserProfileContainer";

export const UserPage = () => {
  return (
    <>
      <NavBar />
      <UserProfileContainer />
      <Footer />
    </>
  );
};
