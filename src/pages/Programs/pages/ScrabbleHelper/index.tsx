import { useState, useEffect, useRef, useMemo } from "react";
import style from "./index.module.css";
import { useIntl, FormattedMessage } from "react-intl";
import ScrabbleList from "./components/scrabble-list";
import {
  FetchEvanAPI_ScrabbleHelper_Get,
  IScrabbleHelperData,
} from "fetch/fetch-evan-flask-api";

export default function ScrabbleHelper() {
  const listContainer = useRef(null);
  const [data, setData] = useState([] as Array<IScrabbleHelperData>);
  const [word, setWords] = useState("");
  const [overLimit, setOverLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const scrabbleList = useMemo(() => {
    return <ScrabbleList listData={data} />;
  }, [data]);

  useEffect(() => {
    const regex = /\?/g;
    setOverLimit((word.match(regex) || "").length > 4);
  }, [word]);

  async function fetchData(word: string, setData: any) {
    //console.log(intl.locale);
    const evanRes = await FetchEvanAPI_ScrabbleHelper_Get(
      word,
      intl.locale.includes("zh") ? "Y" : "N"
    );
    if (evanRes.code === "0000") {
      //console.log(evanRes);
      setData(evanRes.data);
    }
  }

  async function onSubmit(event: any) {
    event.preventDefault();

    setLoading(true);
    await fetchData(word, setData);
    setLoading(false);
  }

  var summitButton;
  if (loading) {
    summitButton = (
      <button type="submit" className="btn btn-primary w-100 h-100 disabled">
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    );
  } else {
    summitButton = (
      <button
        type="submit"
        className={
          "btn btn-primary w-100 h-100" + (overLimit ? " disabled " : "")
        }
      >
        <FormattedMessage id="scrabbleHelper.summit" />
      </button>
    );
  }

  return (
    <div>
      <main className={style.main}>
        <h3>
          <FormattedMessage id="scrabbleHelper.title" />
        </h3>
        <div className={style.body}>
          <form onSubmit={onSubmit} className="row align-items-sm-stretch">
            <div className="col-sm-12 col-md-9 p-2">
              <div className="input-group input-group-sm h-100">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  <FormattedMessage id="scrabbleHelper.word" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={word}
                  onChange={(e) => setWords(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-3 p-2">{summitButton}</div>
          </form>
          <ul className="txt-tip1 mb-3">
            <li>
              <FormattedMessage id="scrabbleHelper.description1" />
            </li>
            <li className={overLimit ? "txt-err1" : ""}>
              <FormattedMessage id="scrabbleHelper.description2" />
            </li>
          </ul>
          <div
            className={style.list_container + " bg-secondary w-100"}
            ref={listContainer}
          >
            {scrabbleList}
          </div>
        </div>
      </main>
    </div>
  );
}
