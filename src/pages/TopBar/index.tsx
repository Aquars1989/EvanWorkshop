import Logo from "images/logo.svg";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import GuestIconBase from "images/guest-icon-base.svg";
import {
  useGuestStateContext,
  useGuestDispatchContext,
} from "../../provider/guest-provider";
import { FormattedMessage } from "react-intl";
import { FetchEvanAPI_Guest_Post } from "fetch/fetch-evan-dotnet-api";

interface Props {
  locale: string;
  setLocale: any;
}

export default function TopBar({ locale , setLocale }:Props) {
  const [isOpen, setIsOpen] = useState(false);

  const guest = useGuestStateContext();
  const guestDispatch = useGuestDispatchContext();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  async function fetchGuestName() {
    const res = await Axios.get("https://geolocation-db.com/json/");
    const ip = res.data.IPv4;

    const evanRes = await FetchEvanAPI_Guest_Post(ip);
    if (evanRes.code !== "0000") {
      console.error("FetchEvanAPI_Guest_Post.Message", evanRes.message);
      return;
    }

    const data = evanRes.data;
    guestDispatch({
      Ip: ip,
      GuestName: data.name,
      GuestNameWord1: data.word1,
      GuestNameWord2: data.word2,
      GuestNameWord3: data.word3,
    });
  }

  useEffect(() => {
    fetchGuestName();
    //eslint-disable-next-line
  }, []);

  let lang;
  if (locale.includes("zh")) {
    lang = "中文";
  } else {
    lang = "English";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark app-header">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-link app-logo-link" to="gallery" onClick={closeNavbar}>
           <img src={Logo} className="app-logo" width={40} height={40} alt="logo" />
        </NavLink>
        <div className="mx-3">
          <span className="txt-title2">Evan's </span>
          <span className="txt-title1">Workshop</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse "+(isOpen ? 'show' : '')} id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="gallery" onClick={closeNavbar}>
                <FormattedMessage id="topbar.gallery" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="programs" onClick={closeNavbar}>
                <FormattedMessage id="topbar.prgrams" />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="about" onClick={closeNavbar}>
                <FormattedMessage id="topbar.about" />
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center text-info float-right">
            <img
              className={"guest-icon topbar " + guest.GuestName}
              src={GuestIconBase}
              alt={guest.GuestName}
            />
            <FormattedMessage id={"words2." + guest.GuestNameWord2} />
            <span className="me-1"/>
            <FormattedMessage id={"words3." + guest.GuestNameWord3} />
          </div>

          <div className="btn-group p-2">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {lang}
            </button>
            <ul className="dropdown-menu dropdown-menu-start">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    setLocale("en");
                  }}
                >
                  English
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    setLocale("zh");
                  }}
                >
                  中文
                </button>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
