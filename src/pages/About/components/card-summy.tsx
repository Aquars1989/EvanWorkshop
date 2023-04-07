import style from "../index.module.css";
import { FormattedMessage } from "react-intl";

export default function CardSummy() {
  return (
    <div className="card w-75 mx-auto">
      <div className="card-body">
        <div className="row g-0">
          <div className="p-3 m-auto col-md-4">
            <img className="w-100 p-5 shadow" alt="Tonch" src="" />
          </div>
          <div className="p-3 m-auto col-md-8">
            <h2 className="card-title">Evan Hung</h2>
            <span className="lh-lg">
              <FormattedMessage id="about.me" />
            </span>
            <ul>
              <li className="p-2">
                <div>
                  <FormattedMessage id="about.skill" />
                </div>
                <div>
                  <div className="badge bg-secondary m-1">C#</div>
                  <div className="badge bg-secondary m-1">WinForm</div>
                  <div className="badge bg-secondary m-1">Asp.Net</div>
                  <div className="badge bg-secondary m-1">.Net Core</div>
                  <div className="badge bg-secondary m-1">Python</div>
                  <div className="badge bg-secondary m-1">React</div>
                  <div className="badge bg-secondary m-1">Node.js</div>
                  <div className="badge bg-secondary m-1">MS-SQL</div>
                  <div className="badge bg-secondary m-1">SSIS</div>
                  <div className="badge bg-secondary m-1">SSRS</div>
                  <div className="badge bg-secondary m-1">Shell script</div>
                </div>
              </li>

              <li className="p-2">
                <div>
                  <FormattedMessage id="about.hobby" />
                </div>
                <div>
                  <div className={"badge m-1 " + style.massEffect}>
                    ☄Mass effect
                  </div>
                  <div className={"badge m-1 " + style.dragonAge}>
                    🐲Dragon age
                  </div>
                  <div className={"badge m-1 " + style.fallout}>☢Fallout</div>
                  <div className={"badge m-1 " + style.elderScrolls}>
                    🗡Elder scrolls
                  </div>
                  <div className={"badge m-1 " + style.witcher}>🐺Witcher</div>
                  <div className={"badge m-1 " + style.bioshock}>🕊Bioshock</div>
                  <div className={"badge m-1 " + style.dishonored}>
                    🦴Dishonored
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
