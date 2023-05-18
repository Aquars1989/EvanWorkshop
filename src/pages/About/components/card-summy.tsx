import { NavLink } from "react-router-dom";
import style from "../index.module.css";
import { FormattedMessage } from "react-intl";
import MyPic from "images/personal.jpg";
import GitIcon from "images/git_icon.svg";
import LinkinIcon from "images/linkedin_icon.svg";
import { motion } from "framer-motion";

export default function CardSummy() {
  const containerVariants = {
    offscreen: {},
    onscreen: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const tagVariants = {
    offscreen: { opacity: 0 },
    onscreen: { opacity: 1 },
  };

  const list = (
    <ul>
      <motion.div
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        transition={{ duration: 0 }}
        viewport={{ once: false, amount: 0 }}
      >
        <li className="p-lg-2">
          <div>
            <FormattedMessage id="about.skill" />
          </div>
          <div className="d-flex flex-wrap">
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.normal}>C#</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.normal}>WinForm</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.normal}>Asp.Net</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.normal}>.Net Core</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.normal2}>Java</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.normal2}>Python</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>React</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>Bootstrap</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>Chart.js</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>Node.js</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>TypeScript</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>JavaScript</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.web}>jQuery</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.database}>MS-SQL</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.database}>MySQL</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.database}>SSIS</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.database}>SSRS</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.database}>Stored procedure</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.server}>Shell script</div>
            </motion.div>
          </div>
        </li>

        <li className="p-lg-2 mb-4">
          <div>
            <FormattedMessage id="about.hobby" />
          </div>
          <div className="d-flex flex-wrap">
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.videoGames}>🕹Video Games</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.tableTennis}>🏓Table tennis</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.ukulele}>🪕Ukulele</div>
            </motion.div>
            <motion.div variants={tagVariants}>
              <div className={"badge " + style.vrGames}>🥽VR Games</div>
            </motion.div>
          </div>
        </li>
      </motion.div>
      <div className="d-flex flex-wrap">
        <NavLink to="https://github.com/Aquars1989" className={"m-2 "+style.link}>
          <img src={GitIcon} style={{ width: 30, height: 30 }} alt="GitIcon" />
          <span className="ms-1">GitHub</span>
        </NavLink>
        <NavLink to="https://www.linkedin.com/in/evanhung1989" className={"m-2 "+style.link}>
          <img src={LinkinIcon} style={{ width: 30, height: 30 }}  alt="git"/>
          <span className="ms-1">Linkedin</span>
        </NavLink>
      </div>
    </ul>
  );

  return (
    <div className="card w-75 mx-auto">
      <div className="card-body">
        <div className="row g-0">
          <div className="p-3  col-md-4">
            <img className="w-100 p-0 p-sm-5 p-md-0" alt="MyPic" src={MyPic} />
          </div>
          <div className="p-3 m-auto col-md-8">
            <h2 className="card-title">
              {" "}
              <FormattedMessage id="about.title" />
            </h2>
            <span className="lh-lg">
              <FormattedMessage id="about.me" />
            </span>
            <div className="lh-lg d-none d-lg-block">{list}</div>
          </div>
          <div className="p-3 m-auto col-md-12 d-lg-none">{list}</div>
        </div>
      </div>
    </div>
  );
}
