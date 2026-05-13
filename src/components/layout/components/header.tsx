import { NavLink } from "react-router-dom";
import { Dropdown } from "antd";
import { getFirstCharacterOfTheName } from "../../../helpers/CustomHelpers";
//hooks
import { useUserProfile } from "../../../store/userProfile";
//icons
import Logo from "../../../assets/icons/logo.svg?react";

function Header() {
  const { userProfile } = useUserProfile();

  const menuItems = {
    items: [
      {
        key: 'settings',
        label: (
          <NavLink to='/settings'>
            <span>Profile & Settings</span>
          </NavLink>
        )
      },
      {
        key: 'logout',
        label: (
          <NavLink to='/logout'>
            <span className="text-danger">Log out</span>
          </NavLink>
        ),
      },
    ]
  };

  return (
    <section className="flex justify-between items-center w-full">
      <h2 className="text-3xl font-semibold flex items-center gap-2">
        <Logo className="w-10 h-10" />
        Car Rental
      </h2>
      <span className='uppercase text-text-secondary font-medium text-lg'>{userProfile?.role || ""}</span>
      <div className="flex items-center gap-2">
        <Dropdown menu={menuItems} trigger={['click']} placement='bottomRight' className="avatar-drop-down">
          <div className='bg-gray-200 font-semibold text-3xl rounded-full w-12 h-12 flex flex-centered cursor-pointer'>
            {userProfile?.profilePicture ? (
              <img
                src={userProfile?.profilePicture}
                alt={"Profile Picture"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold capitalize">
                {getFirstCharacterOfTheName(userProfile?.firstName)}
              </span>
            )}
          </div>
        </Dropdown>
      </div>
    </section>

  );
}

export default Header;
