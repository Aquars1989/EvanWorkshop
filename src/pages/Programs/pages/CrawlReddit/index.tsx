import { useState, useEffect, useRef, useMemo } from "react";
import style from "./index.module.css";
import RedditList from "./components/reddit-list";
import ReactWordcloud, {
  Optional,
  Options,
  Word,
  Callbacks,
} from "react-wordcloud";
import { tokenizeWords } from "./components/word-cloud";
import { FormattedMessage } from "react-intl";
import {
  FetchEvanAPI_CrawlReddit_Get,
  ICrawlRedditData,
} from "fetch/fetch-evan-flask-api";
import { Props } from "tippy.js";
import "tippy.js/themes/light.css";

export default function CrawlReddit() {
  const listContainer = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState("technology");
  const [data, setData] = useState([] as Array<ICrawlRedditData>);
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState([] as Array<ICrawlRedditData>);
  const [words, setWords] = useState([] as Array<Word>);
  const [loading, setLoading] = useState(false);

  const wordcloudCallbacks: Optional<Callbacks> = useMemo(
    () => ({
      onWordClick: (word) => {
        console.log(loading);
        if (loading) {
          setFilter("");
        } else {
          setFilter(word.text);
        }
      },
    }),
    [loading]
  );

  const clearFilter = () => {
    setFilter("");
  };

  useEffect(() => {
    //console.log(filter);
    if (data.length === 0) {
      setFilterData(data);
    } else {
      if (filter === "") {
        setFilterData(data);
      } else {
        var filterData = data.filter((x: any) => {
          return x.title.toLowerCase().includes(filter);
        });
        setFilterData(filterData);
      }
    }
  }, [data, filter]);

  useEffect(() => {
    if (listContainer.current) {
      listContainer.current.scrollTop = listContainer.current.scrollHeight;
    }
  }, [filterData]);


  async function fetchData(subreddit: string, setData: any) {
    var page = 0;
    var lastThing = "";
    while (page < 5) {
      const evanRes = await FetchEvanAPI_CrawlReddit_Get(subreddit, lastThing);
      if (evanRes.code !== "0000") break;
      if (evanRes === undefined || evanRes.data.length === 0) {
        setData((prev: Array<ICrawlRedditData>) => {
          return prev.concat([]);
        });
        break;
      }
      setData((prev: Array<ICrawlRedditData>) => {
        return prev.concat(evanRes.data);
      });
      lastThing = evanRes.data[evanRes.data.length - 1].thing;
      page++;
    }
  }

  async function onSubmit(event: any) {
    event.preventDefault();
    setData([]);
    setFilter("");
    setLoading(true);
    await fetchData(userInput, setData);
    setLoading(false);
    //console.log(data);
    //genWords(setWords);
  }

  useEffect(() => {
    //console.log(loading, data);
    if (!loading) {
      const wordsToken = tokenizeWords(data, {
        allowNumbers: false,
        maxWords: 100,
        stopwordsInput: "",
      });

      //console.log(wordsToken);

      if (wordsToken === undefined || wordsToken.length === 0) {
        setWords([
          { text: "empty", value: 1 },
          { text: "data", value: 1 },
        ]);
      } else {
        //console.log(wordsToken);
        setWords(wordsToken);
      }
    } else {
      setWords([
        { text: "Waiting", value: 1 },
        { text: "a", value: 1 },
        { text: "second", value: 1 },
      ]);
    }
  }, [loading, data]);

  const tooltip: Optional<Props> = {
    theme: "wordCloud",
  };

  const options: Optional<Options> = {
    colors: [
      "#c1c8ff",
      "#fdd7b6",
      "#e2ffa4",
      "#ff97c8",
      "#ca9af8",
      "#b5ffe2",
      "#ffc0ec",
      "#eeeeee",
      "#fcfdb8",
      "#b0f2ff",
    ],

    fontFamily: "times new roman",
    fontSizes: [10, 60],
    padding: 1,
    rotations: 2,
    rotationAngles: [-90, 0],
    spiral: "archimedean",
    scale: "linear",
    transitionDuration: 500,
    // Non-configurable
    deterministic: true,
    enableOptimizations: true,
    enableTooltip: true,
    tooltipOptions: tooltip,
  };

  const filterLabel =
    data.length === 0 ? (
      <></>
    ) : filter === "" ? (
      <small className="txt-tip1">
        <FormattedMessage id="crawlReddit.tipSetFilter" />
      </small>
    ) : (
      <small className="txt-tip1">
        <FormattedMessage
          id="crawlReddit.tipFilter"
          values={{ filter: filter }}
        />
        <button
          onClick={clearFilter}
          className={style.link_clear_filter + " mx-2"}
        >
          <FormattedMessage id="crawlReddit.tipClearFilter" />
        </button>
      </small>
    );

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
      <button type="submit" className="btn btn-primary w-100 h-100">
        <FormattedMessage id="crawlReddit.summit" />
      </button>
    );
  }

  return (
    <div>
      <main className={style.main}>
        <h3>
          <FormattedMessage id="crawlReddit.title" />
        </h3>
        <div className={style.body}>
          <form onSubmit={onSubmit} className="row align-items-sm-stretch">
            <div className="col-sm-10 col-md-9 p-2">
              <div className="input-group input-group-sm h-100">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  <FormattedMessage id="crawlReddit.subreddit" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-10 col-md-3 p-2">{summitButton}</div>
          </form>
          <ul className="txt-tip1">
            <li>
              <FormattedMessage id="crawlReddit.description" />
            </li>
          </ul>
          <div>
            <div
              className={style.list_container + " bg-secondary w-100 h-50"}
              ref={listContainer}
            >
              <RedditList listData={filterData} />
            </div>
            <div className="h-50">
              {filterLabel}
              <div>
                <ReactWordcloud
                  words={words}
                  options={options}
                  callbacks={wordcloudCallbacks}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
