import { useState, useEffect } from "react";
import style from "./index.module.css";
import IconChangeGrid from "./components/icon-change-grid";
import { useGuestStateContext } from "provider/guest-provider";
import {
  FetchEvanAPI_GuestNamePool_Get,
  FetchEvanAPI_GuestNamePool_Post,
} from "fetch/fetch-evan-dotnet-api";
import { useIntl, FormattedMessage } from "react-intl";
import { FormatError } from "fetch/error-format";
import { motion } from "framer-motion";

export default function IconChange() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const guest = useGuestStateContext();
  const intl = useIntl();

  useEffect(() => {
    if (guest.Ip === "") return;

    const fetchData = async () => {
      setError("");
      const evanRes = await FetchEvanAPI_GuestNamePool_Get(guest.Ip);
      if (evanRes.code === "0000") {
        setData(evanRes.data);
      } else {
        setError(FormatError(intl, evanRes));
      }
    };
    fetchData();
  }, [intl, guest]);

  const tagVariants = {
    offscreen: { opacity: 0 },
    onscreen: { opacity: 1 },
  };

  async function LoadButtomClick() {
    setError("");
    setLoading(true);
    var evanRes = await FetchEvanAPI_GuestNamePool_Post(guest.Ip, 9);
    if (evanRes.code === "0000") {
      setData(evanRes.data);
    } else {
      console.log(evanRes);
      setError(FormatError(intl, evanRes));
    }
    setLoading(false);
  }

  var refreshButton;
  if (loading) {
    refreshButton = (
      <button type="submit" className="btn btn-primary w-100 h-100 disabled">
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    );
  } else {
    refreshButton = (
      <button
        type="submit"
        className="btn btn-primary w-100 h-100"
        onClick={LoadButtomClick}
      >
        <FormattedMessage id="iconChange.refresh" />
      </button>
    );
  }

  var errorMsg;
  if (error !== "") {
    errorMsg = <div className="text-danger mb-2">{error}</div>;
  }

  return (
    <div>
      <main className={style.main}>
        <h3>
          <FormattedMessage id="iconChange.title" />
        </h3>
        <div className={style.body}>
          <div className={style.background}></div>
          <motion.div variants={tagVariants}>
            <ul className="txt-tip1">
              <li>
                <FormattedMessage id="iconChange.description1" />
              </li>
              <li>
                <FormattedMessage id="iconChange.description2" />
              </li>
            </ul>
            <div className="p-2">{refreshButton}</div>
            {errorMsg}
            <div className="px-2">
              <IconChangeGrid listData={data} setError={setError} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
