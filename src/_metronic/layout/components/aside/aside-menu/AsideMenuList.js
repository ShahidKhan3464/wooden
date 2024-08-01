/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { checkIsActive } from "../../../../_helpers";
import { agent, brokers, calendar, car, dashboard, employees, inquiries, leads, owners, properties, yachts, featuredProperty, discount } from '../../../../../img'

import getUserRoles from "./../../../../../api/getUserRoles";







export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "customMenu-active"}`
      : "";
  };

  let role = getUserRoles();

  //console.log(role);
  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav customNav ${layoutProps.ulClasses}`}>

        {/*begin::1 Level*/}
        <li
          className={`menu-item customMenu ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="customMenuLink" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG className="svgIcon" src={dashboard} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {(role.includes("propertiesAdmin") ||
          role.includes("regularAgent") ||
          role.includes("financeAdmin")) && (
            <li
              className={`menu-item customMenu ${getMenuItemActive("/property", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="customMenuLink" to="/property">
                <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={properties} />
                </span>
                <span className="menu-text">Properties</span>
              </NavLink>
            </li>

          )}
        
        {(role.includes("propertiesAdmin") ||
          role.includes("regularAgent") ||
          role.includes("financeAdmin")) && (
            <li
            className={`menu-item customMenu ${getMenuItemActive("/featuredproperties", false)}`}
              aria-haspopup="true"
            >
            <NavLink className="customMenuLink" to="/featuredproperties">
                <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={featuredProperty} />
                </span>
              <span className="menu-text">Featured Properties</span>
              </NavLink>
            </li>

          )}

        {(role.includes("propertiesAdmin") ||
          role.includes("regularAgent") ||
          role.includes("financeAdmin")) && (
            <li
              className={`menu-item customMenu ${getMenuItemActive("/discounts", false)}`}
              aria-haspopup="true"
            >
            <NavLink className="customMenuLink" to="/discounts">
                <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={discount} />
                </span>
              <span className="menu-text">Discounts</span>
              </NavLink>
            </li>

          )}
        

        {(role.includes("propertiesAdmin") ||
          role.includes("regularAgent") ||
          role.includes("financeAdmin")) && (
            <li
            className={`menu-item customMenu ${getMenuItemActive("/discountSetting", false)}`}
              aria-haspopup="true"
            >
            <NavLink className="customMenuLink" to="/discountSetting">
                <span className="svg-icon menu-icon">
                  <SVG className="svgIcon" src={discount} />
                </span>
              <span className="menu-text">Discount Settings</span>
              </NavLink>
            </li>

          )}
        

        {(role.includes("transportationAdmin")) && (
          <>
            <li
              className={`menu-item customMenu ${getMenuItemActive("/car", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="customMenuLink" to="/car">
                <span className="svg-icon menu-icon">
                  <SVG className="svgIcon" src={car} />
                </span>
                <span className="menu-text">Cars</span>
              </NavLink>
            </li>
            <li
              className={`menu-item customMenu ${getMenuItemActive("/yacht", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="customMenuLink" to="/yacht">
                <span className="svg-icon menu-icon">
                  <SVG className="svgIcon" src={yachts} />
                </span>
                <span className="menu-text">Yachts</span>
              </NavLink>
            </li>
          </>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {(role.includes("regularAgent") || role.includes("financeAdmin") || role.includes("leadsAdmin")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/CalendarView", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/CalendarView">
              <span className="svg-icon menu-icon">
                <SVG
                  className="svgIcon"
                  src={calendar}
                />
              </span>
              <span className="menu-text">Calendar View</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {(role.includes("leadsAdmin") || role.includes("regularAgent")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/inquiry", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/inquiry">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={inquiries} />
              </span>
              <span className="menu-text">Inquiries</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {(role.includes("leadsAdmin") || role.includes("regularAgent")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/lead", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/lead">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={leads} />
              </span>
              <span className="menu-text">Leads</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {role.includes("brokerAdmin") && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/owner", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/owner">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={owners} />
              </span>
              <span className="menu-text">Owners</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {role.includes("brokerAdmin") && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/broker", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/broker">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={brokers} />
              </span>
              <span className="menu-text">Brokers</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}


        {/*begin::1 Level*/}

        {(role.includes("brokerAdmin") || role.includes("propertyAdmin") || role.includes("superAdmin")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/3rd-party-agents", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/3rd-party-agents">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={agent} />
              </span>
              <span className="menu-text">3rd Party Agents</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}


        {/*begin::1 Level*/}

        {(role.includes("brokerAdmin") || role.includes("financeAdmin")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/Employee", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/Employee">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={employees} />
              </span>
              <span className="menu-text">Employees</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}
        {(role.includes("brokerAdmin") || role.includes("financeAdmin")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/instagram", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/instagram">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={employees} />
              </span>
              <span className="menu-text">Instagram</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}
        {/*end::1 Level*/}
        {(role.includes("brokerAdmin") || role.includes("financeAdmin")) && (
          <li
            className={`menu-item customMenu ${getMenuItemActive("/reviews", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="customMenuLink" to="/reviews">
              <span className="svg-icon menu-icon">
                <SVG className="svgIcon" src={employees} />
              </span>
              <span className="menu-text">Reviews</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}
        
      </ul>
      {/* end::Menu Nav */}
    </>
  );
}
