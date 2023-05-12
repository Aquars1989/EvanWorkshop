import { ReactNode } from "react";
import Style from "../index.module.css";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { v4 } from "uuid";

interface Props {
  title: string;
  workAs: string;
  during: string;
  description: string;
  tag: Array<ReactNode>;
}

export default function CardJob({
  title,
  workAs,
  during,
  description,
  tag,
}: Props) {
  const containerVariants = {
    offscreen: {},
    onscreen: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const tagVariants = {
    offscreen: { opacity: 0 },
    onscreen: { opacity: 1 },
  };

  const size_md = useMediaQuery({ minWidth: 768 });
  const size_xl = useMediaQuery({ minWidth: 1200 });
  const cardSize = size_xl ? "w-50":"w-75";

  const tagDiv = size_md ? (
    <div className="col-md-6 p-3">
      <div className={Style.carousel_card_head}>
        <FormattedMessage id="about.use" />
      </div>
      <motion.div
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        transition={{ duration: 0 }}
        viewport={{ once: false, amount: 0 }}
      >
        <div className="d-md-flex flex-wrap">
          {tag.map((item) => {
            return <motion.div key={v4()} variants={tagVariants}>{item}</motion.div>;
          })}
        </div>
      </motion.div>
    </div>
  ) : (
    <div className="card-footer ">
      <motion.div
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        transition={{ duration: 0 }}
        viewport={{ once: false, amount: 0 }}
      >
        <div className="d-flex flex-wrap p-2">
          {tag.map((item) => {
            return <motion.div key={v4()} variants={tagVariants}>{item}</motion.div>;
          })}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className={"card "+cardSize+" shadow mx-auto " + Style.job_card}>
      <div className="card-header">
        <div className="card-title">
          <h5>
            <b>{title}</b>
          </h5>
        </div>
        <div className="card-subtitle row align-items-md-stretch">
          <div className="col-lg-5">
            <b>{workAs}</b>
          </div>
          <div className="col-lg-7 text-lg-end">{during}</div>
        </div>
      </div>
      <div className="card-subtitle row align-items-md-stretch">
        <div className="card-body overflow-auto col-md-6">
          <ul>
            {description.split(";").map((x) => {
              return <li key={v4()}>{x}</li>
            })}
          </ul>
        </div>
        {tagDiv}
      </div>
    </div>
  );
}
