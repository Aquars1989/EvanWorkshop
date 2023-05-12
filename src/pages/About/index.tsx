import {
  Foot1L,
  Foot1R,
  Foot2L,
  Foot2R,
  Foot3L,
  Foot3R,
} from "./components/foots";
import style from "./index.module.css";
import CardJob from "./components/card-job";
import CardSummy from "./components/card-summy";
import { useIntl } from "react-intl";
import { useScroll } from "framer-motion";
import { v4 } from "uuid";
import { useState } from "react";

export default function About() {
  const [positionX1, setPositionX1] = useState(0);
  const [positionX2, setPositionX2] = useState(0);
  const [positionX3, setPositionX3] = useState(0);
  const [positionX4, setPositionX4] = useState(0);
  const [positionY1, setPositionY1] = useState(0);
  const [positionY2, setPositionY2] = useState(0);
  const [positionY3, setPositionY3] = useState(0);
  const [positionY4, setPositionY4] = useState(0);
  const [opacity1, setOpacity1] = useState(0);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);
  const [opacity4, setOpacity4] = useState(0);
  const intl = useIntl();

  const { scrollYProgress } = useScroll({
    offset: [0.1, 1],
  });

  const y1 = 0.10;
  const y2 = 0.35;
  const y3 = 0.60;
  const y4 = 0.85;
  const slideX = 100;
  const slideInY = 30;
  const slideOutY = -30;
  const slideInOpacity = -100;
  const slideOutOpacity = -100;
  // Subscribe to the onChange event of the scrollY value and update the divPosition value
  scrollYProgress.onChange((y) => {
    setPositionX1(y < y1 || y >= y2 ? slideX : 0);
    setPositionY1(y < y1 ? slideInY : y >= y2 ? slideOutY : 0);
    setOpacity1(y < y1 ? slideInOpacity : y >= y2 ? slideOutOpacity : 100);
    setPositionX2(y < y2 || y >= y3 ? slideX : 0);
    setPositionY2(y < y2 ? slideInY : y >= y3 ? slideOutY : 0);
    setOpacity2(y < y2 ? slideInOpacity : y >= y3 ? slideOutOpacity : 100);
    setPositionX3(y < y3 || y >= y4 ? slideX : 0);
    setPositionY3(y < y3 ? slideInY : y >= y4 ? slideOutY : 0);
    setOpacity3(y < y3 ? slideInOpacity : y >= y4 ? slideOutOpacity : 100);
    setPositionX4(y < y4 ? slideX : 0);
    setPositionY4(y < y4 ? slideInY : 0);
    setOpacity4(y < y4 ? slideInOpacity : 100);
  });

  return (
    <div className={style.main + " bg-gradient bg-dark pb-5"}>
      <CardSummy />
      <div
        className={"fixed-top w-100 top-0 ms-4 px-2 "+style.fixedBox}
        style={{
          transform: `translateX(${positionX1}%) translateY(${positionY1}%)`,
          opacity: `${opacity1}%`,
          transition: "transform 0.4s ease-in, opacity 0.3s ease-out",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.dynapack" })}
          workAs={intl.formatMessage({ id: "about.dynapackWorkAs" })}
          during={intl.formatMessage({ id: "about.dynapackDuring" })}
          description={intl.formatMessage({ id: "about.dynapackDescription" })}
          tag={[
            <div key={v4()} className={"badge " + style.normal}>
              C#
            </div>,
            <div key={v4()} className={"badge " + style.normal}>
              .Net Core
            </div>,
            <div key={v4()} className={"badge " + style.normal}>
              Winform
            </div>,
            <div key={v4()} className={"badge " + style.normal2}>
              Python
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              MS-SQL
            </div>,
          ]}
        />
      </div>
      <div
        className={"fixed-top w-100 top-0 ms-4 px-2 "+style.fixedBox}
        style={{
          transform: `translateX(${positionX2}%) translateY(${positionY2}%)`,
          opacity: `${opacity2}%`,
          transition: "transform 0.4s ease-in, opacity 0.3s ease-out",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.cathaybk" })}
          workAs={intl.formatMessage({ id: "about.cathaybkWorkAs" })}
          during={intl.formatMessage({ id: "about.cathaybkDuring" })}
          description={intl.formatMessage({ id: "about.cathaybkDescription" })}
          tag={[
            <div key={v4()} className={"badge " + style.normal}>
              C#
            </div>,
            <div key={v4()} className={"badge " + style.normal}>
              .Net Core
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              React
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              Bootstrap
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              Chart.js
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              Node.js
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              TypeScript
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              Javascript
            </div>,
            <div key={v4()} className={"badge " + style.web}>
              jQuery
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              MS-SQL
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              SSIS
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              SSRS
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              Stored procedure
            </div>,
            <div key={v4()} className={"badge " + style.server}>
              Shell script
            </div>,
          ]}
        />
      </div>
      <div
        className={"fixed-top w-100 top-0 ms-4 px-2 "+style.fixedBox}
        style={{
          transform: `translateX(${positionX3}%) translateY(${positionY3}%)`,
          opacity: `${opacity3}%`,
          transition: "transform 0.4s ease-in, opacity 0.3s ease-out",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.tonch" })}
          workAs={intl.formatMessage({ id: "about.tonchWorkAs" })}
          during={intl.formatMessage({ id: "about.tonchDuring" })}
          description={intl.formatMessage({ id: "about.tonchDescription" })}
          tag={[
            <div key={v4()} className={"badge " + style.normal}>
              Asp.Net
            </div>,
            <div key={v4()} className={"badge " + style.normal}>
              WinForm
            </div>,
            <div key={v4()} className={"badge " + style.normal}>
              Socket
            </div>,
            <div key={v4()} className={"badge " + style.normal}>
              Win CE
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              MS-SQL
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              SSRS
            </div>,
          ]}
        />
      </div>
      <div
        className={"fixed-top w-100 top-0 ms-4 px-2 "+style.fixedBox}
        style={{
          transform: `translateX(${positionX4}%) translateY(${positionY4}%)`,
          opacity: `${opacity4}%`,
          transition: "transform 0.4s ease-in, opacity 0.3s ease-out",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.bachelor" })}
          workAs={intl.formatMessage({ id: "about.bachelorWorkAs" })}
          during={intl.formatMessage({ id: "about.bachelorTime" })}
          description={intl.formatMessage({ id: "about.bachelorDescription" })}
          tag={[
            <div key={v4()} className={"badge " + style.normal}>
              Asp.Net
            </div>,
            <div key={v4()} className={"badge " + style.normal2}>
              Java
            </div>,
            <div key={v4()} className={"badge " + style.database}>
              MySQL
            </div>,
          ]}
        />
      </div>

      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot1L />
      <Foot1R />
      <Foot2L />
      <Foot2R />
      <Foot2L />
      <Foot2R />
      <Foot2L />
      <Foot2R />
      <Foot2L />
      <Foot2R />
      <Foot2L />
      <Foot2R />
      <Foot2L />
      <Foot3R />
      <Foot3L />
    </div>
  );
}
