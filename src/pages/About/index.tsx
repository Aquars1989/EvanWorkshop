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
import DynapackIcon from "images/DynapackIcon.png";
import CathaybkIcon from "images/CathaybkIcon.png";
import TonchIcon from "images/TonchIcon.png";
import NPUSTLogo from "images/NPUSTLogo.svg";
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
    [0.12, 0.2, 0.3, 0.35],
    ["30%", "0%", "0%", "30%"]
  );
  const translateX3 = useTransform(
    scrollYProgress,
    [0.32, 0.4, 0.5, 0.55],
    ["30%", "0%", "0%", "30%"]
  );
  const translateX4 = useTransform(
    scrollYProgress,
    [0.52, 0.6, 0.7, 0.75],
    ["30%", "0%", "0%", "30%"]
  );
  const translateX5 = useTransform(
    scrollYProgress,
    [0.72, 0.8, 0.9, 0.95],
    ["30%", "0%", "0%", "30%"]
  );

  //const translateY1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["0%", "0%", "-30%"]);
  const translateY2 = useTransform(
    scrollYProgress,
    [0.12, 0.2, 0.3, 0.35],
    ["30%", "0%", "0%", "-30%"]
  );
  const translateY3 = useTransform(
    scrollYProgress,
    [0.32, 0.4, 0.5, 0.55],
    ["30%", "0%", "0%", "-30%"]
  );
  const translateY4 = useTransform(
    scrollYProgress,
    [0.52, 0.6, 0.7, 0.75],
    ["30%", "0%", "0%", "-30%"]
  );
  const translateY5 = useTransform(
    scrollYProgress,
    [0.72, 0.8, 0.9, 0.95],
    ["30%", "0%", "0%", "-30%"]
  );

  //const opacity1 = useTransform(scrollYProgress, [0.00, 0.10, 0.15], ["100%", "100%", "0%"]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.12, 0.2, 0.32, 0.35],
    ["0%", "100%", "100%", "0%"]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.32, 0.4, 0.52, 0.55],
    ["0%", "100%", "100%", "0%"]
  );
  const opacity4 = useTransform(
    scrollYProgress,
    [0.52, 0.6, 0.72, 0.75],
    ["0%", "100%", "100%", "0%"]
  );
  const opacity5 = useTransform(
    scrollYProgress,
    [0.72, 0.8, 0.92, 0.95],
    ["0%", "100%", "100%", "0%"]
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
          description={intl.formatMessage({ id: "about.dynapackDescription" })}
          tag={[".net Core", "Winform", "Com port"]}
          image={DynapackIcon}
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
          description={intl.formatMessage({ id: "about.cathaybkDescription" })}
          tag={[
            ".net Core",
            "Shell Script",
            "Stored procedure",
            "SSIS",
            "SSRS",
          ]}
          image={CathaybkIcon}
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
          description={intl.formatMessage({ id: "about.tonchDescription" })}
          tag={["Asp.net", "Winform", "MS-SQL", "SSRS", "Socket", "Win CE"]}
          image={TonchIcon}
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
          description={intl.formatMessage({ id: "about.bachelorDescription" })}
          tag={["Java", "Asp.net", "MySQL"]}
          image={NPUSTLogo}
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
    </div>
  );
}
