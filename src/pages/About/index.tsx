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
import { motion, useScroll, useTransform } from "framer-motion";
import { v4 } from "uuid";

export default function About() {
  const intl = useIntl();

  const { scrollYProgress } = useScroll({
    offset: [0.1, 1],
  });

  //const translateX1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["0%", "0%", "30%"]);
  const translateX2 = useTransform(
    scrollYProgress,
    [0.00, 0.10, 0.30, 0.35],
    ["100%", "0%", "0%", "30%"]
  );
  const translateX3 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.60],
    ["100%", "0%", "0%", "30%"]
  );
  const translateX4 = useTransform(
    scrollYProgress,
    [0.50, 0.60, 0.80, 0.85],
    ["100%", "0%", "0%", "30%"]
  );
  const translateX5 = useTransform(
    scrollYProgress,
    [0.75, 0.85, 1.00],
    ["100%", "0%", "0%"]
  );

  //const translateY1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["0%", "0%", "-30%"]);
  const translateY2 = useTransform(
    scrollYProgress,
    [0.00, 0.10, 0.30, 0.35],
    ["20%", "0%", "0%", "-20%"]
  );
  const translateY3 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.60],
    ["20%", "0%", "0%", "-20%"]
  );
  const translateY4 = useTransform(
    scrollYProgress,
    [0.50, 0.60, 0.80, 0.85],
    ["20%", "0%", "0%", "-20%"]
  );
  const translateY5 = useTransform(
    scrollYProgress,
    [0.75, 0.85, 1.00],
    ["20%", "0%", "0%"]
  );

  //const opacity1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["100%", "100%", "0%"]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.00, 0.10, 0.30, 0.35],
    ["100%", "100%", "100%", "0%"]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.60],
    ["100%", "100%", "100%", "0%"]
  );
  const opacity4 = useTransform(
    scrollYProgress,
    [0.50, 0.60, 0.80, 0.85],
    ["100%", "100%", "100%", "0%"]
  );
  const opacity5 = useTransform(
    scrollYProgress,
    [0.75, 0.85, 1.00],
    ["100%", "100%", "100%"]
  );

  return (
    <div className={style.main + " bg-gradient bg-dark"}>
      <CardSummy />
      <motion.div
        className="fixed-top w-100 top-0"
        style={{
          translateX: translateX2,
          translateY: translateY2,
          opacity: opacity2,
          pointerEvents: "none",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.dynapack" })}
          time={intl.formatMessage({ id: "about.dynapackTime" })}
          workAs={intl.formatMessage({ id: "about.dynapackWorkAs" })}
          during={intl.formatMessage({ id: "about.dynapackDuring" })}
          description={intl.formatMessage({ id: "about.dynapackDescription" })}
          tag={[
            <div key={v4()} className={"badge "+style.normal}>C#</div>,
            <div key={v4()} className={"badge "+style.normal}>.Net Core</div>,
            <div key={v4()} className={"badge "+style.normal}>Winform</div>,
            <div key={v4()} className={"badge "+style.normal2}>Python</div>,
            <div key={v4()} className={"badge "+style.database}>MS-SQL</div>]}
        />
      </motion.div>
      <motion.div
        className="fixed-top w-100 top-0"
        style={{
          translateX: translateX3,
          translateY: translateY3,
          opacity: opacity3,
          pointerEvents: "none",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.cathaybk" })}
          time={intl.formatMessage({ id: "about.cathaybkTime" })}
          workAs={intl.formatMessage({ id: "about.cathaybkWorkAs" })}
          during={intl.formatMessage({ id: "about.cathaybkDuring" })}
          description={intl.formatMessage({ id: "about.cathaybkDescription" })}
          tag={[
            <div key={v4()} className={"badge "+style.normal}>C#</div>,
            <div key={v4()} className={"badge "+style.normal}>.Net Core</div>,
            <div key={v4()} className={"badge "+style.web}>React</div>,
            <div key={v4()} className={"badge "+style.web}>Bootstrap</div>,
            <div key={v4()} className={"badge "+style.web}>Chart.js</div>,
            <div key={v4()} className={"badge "+style.web}>Node.js</div>,
            <div key={v4()} className={"badge "+style.web}>TypeScript</div>,
            <div key={v4()} className={"badge "+style.web}>Javascript</div>,
            <div key={v4()} className={"badge "+style.web}>jQuery</div>,
            <div key={v4()} className={"badge "+style.database}>MS-SQL</div>,
            <div key={v4()} className={"badge "+style.database}>SSIS</div>,
            <div key={v4()} className={"badge "+style.database}>SSRS</div>,
            <div key={v4()} className={"badge "+style.database}>Stored procedure</div>,
            <div key={v4()} className={"badge "+style.server}>Shell script</div>
          ]}
        />
      </motion.div>
      <motion.div
        className="fixed-top w-100 top-0"
        style={{
          translateX: translateX4,
          translateY: translateY4,
          opacity: opacity4,
          pointerEvents: "none",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.tonch" })}
          time={intl.formatMessage({ id: "about.tonchTime" })}
          workAs={intl.formatMessage({ id: "about.tonchWorkAs" })}
          during={intl.formatMessage({ id: "about.tonchDuring" })}
          description={intl.formatMessage({ id: "about.tonchDescription" })}
          tag={[
          <div key={v4()} className={"badge "+style.normal}>Asp.Net</div>,
          <div key={v4()} className={"badge "+style.normal}>WinForm</div>,
          <div key={v4()} className={"badge "+style.normal}>Socket</div>,
          <div key={v4()} className={"badge "+style.normal}>Win CE</div>,
          <div key={v4()} className={"badge "+style.database}>MS-SQL</div>,
          <div key={v4()} className={"badge "+style.database}>SSRS</div>]}
        />
      </motion.div>
      <motion.div
        className="fixed-top w-100 top-0"
        style={{
          translateX: translateX5,
          translateY: translateY5,
          opacity: opacity5,
          pointerEvents: "none",
        }}
      >
        <CardJob
          title={intl.formatMessage({ id: "about.bachelor" })}
          time={intl.formatMessage({ id: "about.bachelorTime" })}
          workAs=""
          during=""
          description={intl.formatMessage({ id: "about.bachelorDescription" })}
          tag={[
          <div key={v4()} className={"badge "+style.normal}>Asp.Net</div>,
          <div key={v4()} className={"badge "+style.normal2}>Java</div>,
          <div key={v4()} className={"badge "+style.database}>MySQL</div>]}
        />
      </motion.div>

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
      <Foot3R />
      <Foot3L />
    </div>
  );
}
