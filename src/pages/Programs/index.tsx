import { motion } from "framer-motion";
import style from "./index.module.css";
import CrawlReddit from "./pages/CrawlReddit";
import ScrabbleHelper from "./pages/ScrabbleHelper";
import CrawlCNN from './pages/CrawlCNN';
import CrawlYahooCrypto from './pages/CrawlYahooCrypto';
import IconChange from "./pages/IconChange";
import { FormattedMessage } from "react-intl";
import "./index.css";

function Demo() {
  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 20,
    },
    onscreen: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="program-content container p-md-5 py-lg-0">
      <div className={style.background}></div>
      <aside className="bd-aside sticky-xl-top text-muted align-self-start mb-3 mb-xl-5 px-2">
        <h2 className="h6 pt-5 pb-3 mb-4 border-bottom text-light">
          <FormattedMessage id="program.catalogs" />
        </h2>
        <nav className="small" id="toc">
          <ul className="list-unstyled">
            <li className="my-2">
              <button
                className="btn d-inline-flex align-items-center collapsed border-0 text-light"
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
                    className="d-inline-flex align-items-center rounded text-decoration-none text-light mx-3"
                    href="#CrawlCNN"
                  >
                    <FormattedMessage id="program.cnn" />
                  </a>
                </li>
                <li>
                  <a
                    className="d-inline-flex align-items-center rounded text-decoration-none text-light mx-3"
                    href="#CrawlReddit"
                  >
                    <FormattedMessage id="program.reddit" />
                  </a>
                </li>
                <li>
                  <a
                    className="d-inline-flex align-items-center rounded text-decoration-none text-light mx-3"
                    href="#CrawlYahooCrypto"
                  >
                    <FormattedMessage id="program.crypto" />
                  </a>
                </li>
              </ul>
            </li>
            <li className="my-2">
              <button
                className="btn d-inline-flex align-items-center collapsed border-0 text-light"
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
                    className="d-inline-flex align-items-center rounded text-decoration-none text-light mx-3"
                    href="#ScrabbleHelper"
                  >
                    <FormattedMessage id="program.scrabbleHelper" />
                  </a>
                </li>
                <li>
                  <a
                    className="d-inline-flex align-items-center rounded text-decoration-none text-light mx-3"
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
          <article className="my-3" id="CrawlCNN">
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>python 3.10</div>
              <div className={"badge " + style.flask}>flask API</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0 }}
              variants={cardVariants}
            >
              <CrawlCNN />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="CrawlReddit">
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>python 3.10</div>
              <div className={"badge " + style.flask}>flask API</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0 }}
              variants={cardVariants}
            >
              <CrawlReddit />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="CrawlYahooCrypto">
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>python 3.10</div>
              <div className={"badge " + style.flask}>flask API</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0 }}
              variants={cardVariants}
            >
              <CrawlYahooCrypto />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="ScrabbleHelper">
            <div className="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <div className={"badge " + style.python}>python 3.10</div>
              <div className={"badge " + style.flask}>flask API</div>
              <div className={"badge " + style.translator}>azure translator</div>
              <div className={"badge " + style.gcp}>
                on <span>GCP</span>
              </div>
            </div>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0 }}
              variants={cardVariants}
            >
              <ScrabbleHelper />
            </motion.div>
          </article>

          <div className={style.content_space}></div>

          <article className="my-3" id="IconChange">
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
              whileInView="onscreen"
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0 }}
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

export default Demo;
