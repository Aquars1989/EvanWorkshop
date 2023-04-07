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

export default function About() {
  const intl = useIntl();

  const { scrollYProgress } = useScroll({
    offset: [0.1, 1],
  });

  //const translateX1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["0%", "0%", "30%"]);
  const translateX2 = useTransform(
    scrollYProgress,
    [0.00, 0.1, 0.25, 0.3],
    ["100%", "0%", "0%", "30%"]
  );
  const translateX3 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.45, 0.5],
    ["100%", "0%", "0%", "30%"]
  );
  const translateX4 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.65, 0.7],
    ["100%", "0%", "0%", "30%"]
  );
  const translateX5 = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.9],
    ["100%", "0%", "0%", "30%"]
  );

  //const translateY1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["0%", "0%", "-30%"]);
  const translateY2 = useTransform(
    scrollYProgress,
    [0.00, 0.1, 0.25, 0.3],
    ["20%", "0%", "0%", "-20%"]
  );
  const translateY3 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.45, 0.5],
    ["20%", "0%", "0%", "-20%"]
  );
  const translateY4 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.65, 0.7],
    ["20%", "0%", "0%", "-20%"]
  );
  const translateY5 = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.9],
    ["20%", "0%", "0%", "-20%"]
  );

  //const opacity1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["100%", "100%", "0%"]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.00, 0.1, 0.25, 0.3],
    ["100%", "100%", "100%", "0%"]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.45, 0.5],
    ["100%", "100%", "100%", "0%"]
  );
  const opacity4 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.65, 0.7],
    ["100%", "100%", "100%", "0%"]
  );
  const opacity5 = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.85, 0.9],
    ["100%", "100%", "100%", "0%"]
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
            <div className={"badge "+style.normal}>C#</div>,
            <div className={"badge "+style.normal}>.Net Core</div>,
            <div className={"badge "+style.normal}>Winform</div>,
            <div className={"badge "+style.normal2}>Python</div>,
            <div className={"badge "+style.database}>MS-SQL</div>]}
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
            <div className={"badge "+style.normal}>C#</div>,
            <div className={"badge "+style.normal}>.Net Core</div>,
            <div className={"badge "+style.web}>React</div>,
            <div className={"badge "+style.web}>Bootstrap</div>,
            <div className={"badge "+style.web}>Chart.js</div>,
            <div className={"badge "+style.web}>Node.js</div>,
            <div className={"badge "+style.web}>Javascript</div>,
            <div className={"badge "+style.web}>jQuery</div>,
            <div className={"badge "+style.database}>MS-SQL</div>,
            <div className={"badge "+style.database}>SSIS</div>,
            <div className={"badge "+style.database}>SSRS</div>,
            <div className={"badge "+style.database}>Stored procedure</div>,
            <div className={"badge "+style.server}>Shell script</div>
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
          <div className={"badge "+style.normal}>Asp.Net</div>,
          <div className={"badge "+style.normal}>WinForm</div>,
          <div className={"badge "+style.normal}>Socket</div>,
          <div className={"badge "+style.normal}>Win CE</div>,
          <div className={"badge "+style.database}>MS-SQL</div>,
          <div className={"badge "+style.database}>SSRS</div>]}
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
          <div className={"badge "+style.normal}>Asp.Net</div>,
          <div className={"badge "+style.normal2}>Java</div>,
          <div className={"badge "+style.database}>MySQL</div>]}
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
      <Foot3R />
      <Foot3L />
      <Foot3R />
      <Foot3L />
    </div>
  );
}
