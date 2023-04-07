import { useState, useEffect, useRef } from "react";
import style from "./index.module.css";
import LeetcodeList from "./components/leetcode-list";
import { FormattedMessage } from "react-intl";
import { Chart } from "react-chartjs-2";
import { FetchEvanAPI_CrawlLeetcode_Get } from "fetch/fetch-evan-flask-api";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ChartData,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

interface IChartCount{
  label:string, 
  total: number, 
  easy: number, 
  medium: number, 
  hard: number 
}

export default function CrawlLeetcode() {
  const chartRef = useRef(null);
  const listContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //const [difficulty, setDifficulty] = useState([]);
  const [tag, setTag] = useState([]);
  const [chartData, setChartData] = useState({
    datasets: [],
  } as ChartData<"bar",any>);

  useEffect(() => {}, []);

  useEffect(() => {
    if (listContainer.current) {
      listContainer.current.scrollTop = listContainer.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    const chart = chartRef.current;
    const tagLabel: Array<string> = Array.from(
      new Set(
        tag.map((x:any) => {
          return x.tag;
        })
      )
    );

    const tagCount:Array<IChartCount> = [];

    tag.forEach((x:any) => {
      const n = tagLabel.indexOf(x.tag);
      var countObject = tagCount[n];
      if (countObject == null) {
        countObject = { label: x.tag, total: 0, easy: 0, medium: 0, hard: 0 };
        tagCount[n] = countObject;
      }

      countObject.total += x.count;
      switch (x.difficulty) {
        case "Easy":
          countObject.easy += x.count;
          break;
        case "Medium":
          countObject.medium += x.count;
          break;
        case "Hard":
          countObject.hard += x.count;
          break;
        default:
          break;
      }
    });

    tagCount.sort((x, y) => {
      return y.total - x.total;
    });

    const chartLabel = [];
    const chartEazy = [];
    const chartMedium = [];
    const chartHard = [];

    for (let i = 0; i < 5 && i < tagCount.length; i++) {
      chartLabel[i] = tagCount[i].label;
      chartEazy[i] = tagCount[i].easy;
      chartMedium[i] = tagCount[i].medium;
      chartHard[i] = tagCount[i].hard;
    }

    //console.log(tagCountEazy);
    //console.log(tagCountMedium);
    //console.log(tagCountHard);
    if (chart) {
      setChartData({
        labels: chartLabel,
        datasets: [
          {
            label: "Easy",
            data: chartEazy,
            borderColor: "rgba(42, 255, 128, 0.5)",
            backgroundColor: "rgba(42, 255, 128, 0.5)",
          },
          {
            label: "Medium",
            data: chartMedium,
            borderColor: "rgba(255, 230, 42, 0.5)",
            backgroundColor: "rgba(255, 230, 42, 0.5)",
          },
          {
            label: "Hard",
            data: chartHard,
            borderColor: "rgba(255, 99, 132, 0.5)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
      //console.log(chartData);
    }
  }, [tag]);

  const options : any= {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leetcode tags count",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  async function fetchData(setData:any, setTag :any) {
    var limit = 20;
    var skip = 0;
    while (skip < 300) {
      const evanRes = await FetchEvanAPI_CrawlLeetcode_Get(limit, skip);

      if (evanRes.code !== "0000") break;
      if (evanRes.data.record.length === 0) break;
      setData((prev:any) => {
        return prev.concat(evanRes.data.record);
      });
      setTag((prev:any) => {
        return prev.concat(evanRes.data.tag);
      });
      skip = skip + limit;
    }
  }

  async function onSubmit(event:any) {
    event.preventDefault();
    setData([]);
    setTag([]);
    setLoading(true);
    await fetchData(setData, setTag);
    setLoading(false);
  }

  var summitButton;
  if (loading) {
    summitButton = (
      <button
        type="submit"
        className="btn btn-primary w-100 h-100 px-2 disabled"
      >
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
        <FormattedMessage id="crawlLettcode.summit" />
      </button>
    );
  }

  var leetcodeList;
  if (data.length > 0) {
    leetcodeList = <LeetcodeList listData={data} />;
  }
  return (
    <div className="w-75 m-auto">
      <main className={style.main}>
        <h3>
          <FormattedMessage id="crawlLettcode.title" />
        </h3>
        <div className={style.body}>
          <form onSubmit={onSubmit} className="mb-3">
            <div className="txt-tip1">
              <FormattedMessage id="crawlLettcode.description" />
            </div>
            {summitButton}
          </form>
          <div
            className={style.list_container + " bg-secondary"}
            ref={listContainer}
          >
            {leetcodeList}
          </div>
          <Chart ref={chartRef} type="bar" options={options} data={chartData} />
        </div>
      </main>
    </div>
  );
}
