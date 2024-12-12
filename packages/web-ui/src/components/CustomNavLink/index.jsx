import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationBlockContext } from "../../utils-hooks/useNavigationBlocker";

const CustomNavLink = ({ to, activeClassName, className, ...rest }) => {
  const { attemptNavigation, setIsAttemptingToNavigate } = useContext(
    NavigationBlockContext
  );
  const currentLocation = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    const nextLocation = typeof to === "object" ? to.pathname : to;

    if (nextLocation !== currentLocation.pathname) {
      setIsAttemptingToNavigate(true);
      attemptNavigation(nextLocation);
    }
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      {...rest}
      className={({ isActive }) =>
        isActive ? `${className} ${activeClassName}` : className
      }
    />
  );
};

export default CustomNavLink;
