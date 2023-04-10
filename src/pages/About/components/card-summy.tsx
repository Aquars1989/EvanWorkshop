import { NavLink } from "react-router-dom";
import style from "../index.module.css";
import { FormattedMessage } from "react-intl";

export default function CardSummy() {
  return (
    <div className="card w-75 mx-auto">
      <div className="card-body">
        <div className="row g-0">
          <div className="p-3 m-auto col-md-4">
            <img className="w-100 p-5 shadow" alt="MyPic" src="" />
          </div>
          <div className="p-3 m-auto col-md-8">
            <h2 className="card-title"> <FormattedMessage id="about.title" /></h2>
            <span className="lh-lg">
              <FormattedMessage id="about.me" />
            </span>
            <ul>
              <li className="p-2">
                <div>
                  <FormattedMessage id="about.skill" />
                </div>
                <div>
                  <div className={"badge "+style.normal}>C#</div>
                  <div className={"badge "+style.normal}>WinForm</div>
                  <div className={"badge "+style.normal}>Asp.Net</div>
                  <div className={"badge "+style.normal}>.Net Core</div>
                  <div className={"badge "+style.normal2}>Java</div>
                  <div className={"badge "+style.normal2}>Python</div>
                  <div className={"badge "+style.web}>React</div>
                  <div className={"badge "+style.web}>Bootstrap</div>
                  <div className={"badge "+style.web}>Chart.js</div>
                  <div className={"badge "+style.web}>Node.js</div>
                  <div className={"badge "+style.web}>Javascript</div>
                  <div className={"badge "+style.web}>jQuery</div>
                  <div className={"badge "+style.database}>MS-SQL</div>
                  <div className={"badge "+style.database}>MySQL</div>
                  <div className={"badge "+style.database}>SSIS</div>
                  <div className={"badge "+style.database}>SSRS</div>
                  <div className={"badge "+style.database}>Stored procedure</div>
                  <div className={"badge "+style.server}>Shell script</div>
                </div>
              </li>

              <li className="p-2">
                <div>
                  <FormattedMessage id="about.hobby" />
                </div>
                <div>
                  <div className={"badge " + style.videoGames}>🕹Video Games</div>
                  <div className={"badge " + style.tableTennis}>🏓Table tennis</div>
                  <div className={"badge " + style.ukulele}>🪕Ukulele</div>
                  <div className={"badge " + style.vrGames}>🥽VR Games</div>
                </div>
                </li>
                  <NavLink to="https://github.com/Aquars1989">My GitHub</NavLink> 
                </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
