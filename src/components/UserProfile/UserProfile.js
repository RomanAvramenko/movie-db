import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.scss";
import { fetchWishList } from "../../store/actions/userPage";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { list, responseList } = useSelector(state => state.userPage);

  useEffect(() => {
    dispatch(fetchWishList(list));
  }, []);

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__avatar">
          <img
            src="https://avatars0.githubusercontent.com/u/38329169?s=460&u=edcdad44948e21f363c9e2aa7e895f3d4607368e&v=4"
            alt=""
            className="profile__avatar_img"
          />
          <p className="profile__avatar_name">Roman Avramenko</p>
        </div>
        <div className="profile__container">
          <p className="profile__container_title">Watch list</p>
          <ul className="profile__container__list">
            {responseList.map(item=> console.log(item))}
            <li className="profile__container__list_item">lorem</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
