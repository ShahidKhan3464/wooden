import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";

import logo from "./logo.jpeg";

export function Brand() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses("brand", true),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo(),
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Brand */}
      <div
        className={`brand flex-column-auto sidenavHeader ${layoutProps.brandClasses}`}
        id="kt_brand"
        style={{ backgroundColor: '#081D33' }}
      >
        {/* begin::Logo */}
        <Link
          style={{
            margin: "auto",
          }}
          to=""
          className="brand-logo"
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "0",
              fontWeight: '800',
              color : 'white'
            }}
          >
            Wooden Door
          </h2>
          {/*<img
            style={{
              width: "60px",
              height: "40px",
            }}
            alt="logo"
            src={logo}
          />*/}
        </Link>
        {/* end::Logo */}

        {layoutProps.asideSelfMinimizeToggle && (
          <>
            {/* begin::Toggle */}
            {/* <button
              className="brand-toggle btn btn-sm px-0"
              id="kt_aside_toggle"
            >
              <span className="svg-icon svg-icon-xl">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Navigation/Angle-double-left.svg"
                  )}
                />
              </span>
            </button> */}
            {/* end::Toolbar */}
          </>
        )}
      </div>
      {/* end::Brand */}
    </>
  );
}
