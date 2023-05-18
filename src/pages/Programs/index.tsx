import { motion, useInView } from "framer-motion";
import style from "./index.module.css";
import CrawlReddit from "./pages/CrawlReddit";
import ScrabbleHelper from "./pages/ScrabbleHelper";
import CrawlCNN from "./pages/CrawlCNN";
import CrawlYahooCrypto from "./pages/CrawlYahooCrypto";
import IconChange from "./pages/IconChange";
import { FormattedMessage } from "react-intl";
import "./index.css";
import { useRef } from "react";

export default function Programs() {
  const refCNN = useRef(null)
  const refReddit = useRef(null)
  const refCrypto = useRef(null)
  const refScrabble = useRef(null)
  const refIcon = useRef(null)
  const inViewCNN = useInView(refCNN,{amount:0.2})
  const inViewReddit = useInView(refReddit,{amount:0.2})
  const inViewCrypto = useInView(refCrypto,{amount:0.2})
  const inViewScrabble = useInView(refScrabble,{amount:0.2})
  const inViewIcon = useInView(refIcon,{amount:0.2})
  const cssCNN = inViewCNN ? "text-white":"text-white-50"
  const cssReddit = inViewReddit && !inViewCNN ? "text-white":"text-white-50"
  const cssCrypto =inViewCrypto && !inViewReddit ? "text-white":"text-white-50"
  const cssScrabble = inViewScrabble && !inViewCrypto ? "text-white":"text-white-50"
  const cssIcon = inViewIcon && !inViewScrabble ? "text-white":"text-white-50"
  const cssCrawl = inViewCNN || inViewReddit || inViewCrypto ? "text-white":"text-white-50"
  const cssTools = !inViewCrypto && (inViewScrabble||inViewIcon) ? "text-white":"text-white-50"

  const cardVariants = {
    offscreen: {},
    onscreen: {
      transition: {
        delayChildren: 0.2,
      },
    }
  };

  return (
    <div className="program-content container p-md-5 py-xl-0">
      <div className={style.background}></div>
      <aside className="bd-aside sticky-xl-top text-muted align-self-start mb-3 mb-xl-5 px-2">
        <h2 className="h6 pt-5 pb-3 mb-4 border-bottom text-light">
          <FormattedMessage id="program.catalogs" />
        </h2>
        <nav className="small" id="toc">
          <ul className="list-unstyled">
            <li className="my-2">
              <button
                className={"btn d-inline-flex align-items-center collapsed border-0 "+cssCrawl}
                data-bs-toggle="collapse"
                aria-expanded="false"
                data-bs-target="#crawl-collapse"
                aria-controls="crawl-collapse"
              >
                <FormattedMessage id="program.crawl" />
              </button>
              <ul className="list-unstyled ps-3 collapse" id="crawl-collapse">
                <li>
                  <a
                    className={"d-inline-flex align-items-center rounded text-decoration-none mx-3 "+cssCNN}
                    href="#CrawlCNN"
                  >
                    <FormattedMessage id="program.cnn" />
                  </a>
                </li>
                <li>
                  <a
                    className={"d-inline-flex align-items-center rounded text-decoration-none mx-3 "+cssReddit}
                    href="#CrawlReddit"
                  >
                    <FormattedMessage id="program.reddit" />
                  </a>
                </li>
                <li>
                  <a
                    className={"d-inline-flex align-items-center rounded text-decoration-none mx-3 "+cssCrypto}
                    href="#CrawlYahooCrypto"
                  >
                    <FormattedMessage id="program.crypto" />
                  </a>
                </li>
              </ul>
            </li>
            <li className="my-2">
              <button
                className={"btn d-inline-flex align-items-center collapsed border-0 "+cssTools}
                data-bs-toggle="collapse"
                aria-expanded="false"
                data-bs-target="#tools-collapse"
                aria-controls="tools-collapse"
              >
                <FormattedMessage id="program.tools" />
              </button>
              <ul className="list-unstyled ps-3 collapse" id="tools-collapse">
                <li>
                  <a
                    className={"d-inline-flex align-items-center rounded text-decoration-none mx-3 "+cssScrabble}
                    href="#ScrabbleHelper"
                  >
                    <FormattedMessage id="program.scrabbleHelper" />
                  </a>
                </li>
                <li>
                  <a
                    className={"d-inline-flex align-items-center rounded text-decoration-none mx-3 "+cssIcon}
                    href="#IconChange"
                  >
                    <FormattedMessage id="program.changeName" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="bd-cheatsheet container-fluid bg-gradient bg-dark ps-0">
        <section id="content">
          <article className="my-3" id="CrawlCNN" ref={refCNN}>
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>Python 3.10</div>
              <div className={"badge " + style.flask}>Flask API</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              animate={inViewCNN ? "onscreen" : "offscreen"}
              transition={{ duration: 0.5 }}
              variants={cardVariants}
            >
              <CrawlCNN />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="CrawlReddit" ref={refReddit}>
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>Python 3.10</div>
              <div className={"badge " + style.flask}>Flask API</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              animate={inViewReddit ? "onscreen" : "offscreen"}
              transition={{ duration: 0.5 }}
              variants={cardVariants}
            >
              <CrawlReddit />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="CrawlYahooCrypto" ref={refCrypto}>
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>Python 3.10</div>
              <div className={"badge " + style.flask}>Flask API</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              animate={inViewCrypto ? "onscreen" : "offscreen"}
              transition={{ duration: 0.5 }}
              variants={cardVariants}
            >
              <CrawlYahooCrypto />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="ScrabbleHelper" ref={refScrabble}>
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>Python 3.10</div>
              <div className={"badge " + style.flask}>Flask API</div>
              <div className={"badge " + style.translator}>
                Azure Translator
              </div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              animate={inViewScrabble ? "onscreen" : "offscreen"}
              transition={{ duration: 0.5 }}
              variants={cardVariants}
            >
              <ScrabbleHelper />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="IconChange" ref={refIcon}>
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.netCore}>.Net Core 7.0</div>
              <div className={"badge " + style.mssql}>MS-SQL</div>
              <div className={"badge " + style.restful}>Restful API</div>
              <div className={"badge " + style.azure}>
                on <span>Azure</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              animate={inViewIcon ? "onscreen" : "offscreen"}
              transition={{ duration: 0.5 }}
              variants={cardVariants}
            >
              <IconChange />
            </motion.div>
          </article>

          <div className={style.content_space}></div>
        </section>
      </div>
    </div>
  );
}
