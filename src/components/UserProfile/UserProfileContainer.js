import React from "react";
import { UserProfile } from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  readWishList,
  fetchWishList,
  removeFromWishList,
} from "../../store/actions/auth";

export const UserProfileContainer = () => {
  const dispatch = useDispatch();
  const { list, userId, responseList, token, userData } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(readWishList(userId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchWishList(list));
    // eslint-disable-next-line
  }, [list]);

  const handleRemoveButton = (e, id) => dispatch(removeFromWishList(userId, id, e));

  return (
    <UserProfile
      responseList={responseList}
      token={token}
      userData={userData}
      handleRemoveButton={handleRemoveButton}
    />
  );
};
