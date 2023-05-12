import { useState, useEffect, useRef } from "react";
import style from "./index.module.css";
import CNNList from "./components/cnn-list";
import { useIntl, FormattedMessage } from "react-intl";
import { Bar } from "react-chartjs-2";
import {
  FetchEvanAPI_CrawlCNN_Get,
  ICrawlCNNData,
} from "fetch/fetch-evan-flask-api";
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
  Legend,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend
);

interface IChartCount {
  label: string;
  total: number;
  categrays: Map<string, number>;
}

interface IChartCountMap {
  total: number;
  categrays: Map<string, number>;
}

export default function CrawlCNN() {
  const chartRef = useRef(null);
  const listContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([] as Array<ICrawlCNNData>);
  const [countData, setCountData] = useState([] as Array<IChartCount>);
  const [chartData, setChartData] = useState({
    datasets: [],
  } as ChartData<"bar", any>);
  const intl = useIntl();

  useEffect(() => {
    const countDataMap = new Map<string, IChartCountMap>();
    let eachDate = new Date();
    for (let i = 0; i < 30; i++) {
      eachDate.setDate(eachDate.getDate() - 1);
      countDataMap.set(eachDate.toISOString().slice(0, 10), {
        total: 0,
        categrays: new Map<string, number>(),
      });
    }
    MapToCountData(countDataMap, setCountData);
  }, []);

  useEffect(() => {
    if (listContainer.current) {
      listContainer.current.scrollTop = listContainer.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    //console.log(countData);
    const chart = chartRef.current;
    if (chart) {
      const chartLabel = [];
      const categoryMap = new Map<string, number>();
      for (let i = 0; i < countData.length; i++) {
        chartLabel[i] = countData[i].label.substring(5);
        countData[i].categrays.forEach((value, key) => {
          if (key !== "<null>") {
            categoryMap.set(key, (categoryMap.get(key) ?? 0) + value);
          }
        });
      }
      //console.log(categoryMap);

      const categoryArray: Array<any> = [];
      categoryMap.forEach((value, key) => {
        categoryArray.push({ key: key, value: value });
      });
      categoryArray.sort((x, y) => {
        return y.value - x.value;
      });
      let category1 = "";
      let category2 = "";
      let category3 = "";
      if (categoryArray.length > 1) category1 = categoryArray[0].key;
      if (categoryArray.length > 2) category2 = categoryArray[1].key;
      if (categoryArray.length > 3) category3 = categoryArray[2].key;

      const chartValue1 = Array<number>(countData.length);
      const chartValue2 = Array<number>(countData.length);
      const chartValue3 = Array<number>(countData.length);
      const chartValue4 = Array<number>(countData.length);
      for (let i = 0; i < countData.length; i++) {
        chartValue1[i] = 0;
        chartValue2[i] = 0;
        chartValue3[i] = 0;
        chartValue4[i] = 0;
        countData[i].categrays.forEach((value, key) => {
          if (key === category1) chartValue1[i] += value;
          else if (key === category2) chartValue2[i] += value;
          else if (key === category3) chartValue3[i] += value;
          else chartValue4[i] += value;
        });
      }
      //console.log(category1,chartValue1);
      //console.log(category2,chartValue1);
      //console.log(category3,chartValue1);
      //console.log(4,chartValue4);

      const datasets = new Array<any>();
      if (chartValue4.reduce((acc, val) => acc + val, 0)) {
        datasets.push({
          label: "other",
          data: chartValue4,
          backgroundColor: "rgba(255, 255, 200)",
        });
      }

      if (category1 !== "") {
        datasets.push({
          label: category1,
          data: chartValue1,
          backgroundColor: "rgba(255, 120, 98)",
        });
      }

      if (category2 !== "") {
        datasets.push({
          label: category2,
          data: chartValue2,
          backgroundColor: "rgba(42, 220, 255)",
        });
      }

      if (category3 !== "") {
        datasets.push({
          label: category3,
          data: chartValue1,
          backgroundColor: "rgba(195, 60, 220)",
        });
      }

      setChartData({
        labels: chartLabel,
        datasets: datasets,
      });
      //console.log(chartData);
    }
  }, [countData]);

  const options: any = {
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: "top",
        display: true,
        align: "start",
        labels: {
          color: "#FFFFFF80",
          usePointStyle: true,
        },
      },
      title: {
        color: "#FFFFFFBB",
        display: true,
        text: intl.formatMessage({ id: "crawlCNN.chartTitle" }),
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        grid: {
          drawBorder: true,
          color: "#FFFFFF20",
        },
        ticks: {
          precision: 0,
          color: "#FFFFFF80",
        },
        border: {
          color: "#FFFFFF80",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        suggestedMin: 10,
        grid: {
          drawBorder: true,
          color: "#FFFFFF20",
        },
        ticks: {
          precision: 0,
          color: "#FFFFFF80",
        },
        border: {
          color: "#FFFFFF80",
        },
      },
    },
  };

  async function fetchData(word: string, setData: any, setTag: any) {
    const countDataMap = new Map<string, IChartCountMap>();
    let eachDate = new Date();
    for (let i = 0; i < 30; i++) {
      eachDate.setDate(eachDate.getDate() - 1);
      countDataMap.set(eachDate.toISOString().slice(0, 10), {
        total: 0,
        categrays: new Map<string, number>(),
      });
    }
    MapToCountData(countDataMap, setCountData);

    var size = 100;
    var skip = 0;
    var run = true;
    while (run && skip < 1000) {
      const evanRes = await FetchEvanAPI_CrawlCNN_Get(word, size, skip);
      if (evanRes.code !== "0000") break;
      if (evanRes.data.length === 0) break;

      let evanData = evanRes.data;
      for (let i = 0; i < evanData.length; i++) {
        const date = new Date(evanData[i].lastPublish);
        if (date < eachDate) {
          //console.log(date,eachDate);
          evanData.length = i;
          run = false;
          break;
        }
      }

      setData((prev: any) => {
        return prev.concat(evanData);
      });

      for (let i = 0; i < evanData.length; i++) {
        const date = new Date(evanData[i].firstPublish)
          .toISOString()
          .slice(0, 10);
        const count = countDataMap.get(date);
        if (count !== undefined) {
          const categrays = evanData[i].category ?? "<null>";
          count.categrays.set(
            categrays,
            (count.categrays.get(categrays) ?? 0) + 1
          );
          countDataMap.set(date, {
            total: count.total + 1,
            categrays: count.categrays,
          });
        }
      }
      MapToCountData(countDataMap, setCountData);
      skip = skip + size;
    }
  }

  function MapToCountData(
    countDataMap: Map<string, IChartCountMap>,
    setCountData: any
  ) {
    const countArray: Array<IChartCount> = [];
    countDataMap.forEach((value, key) => {
      countArray.push({
        label: key,
        total: value.total,
        categrays: value.categrays,
      });
    });
    countArray.sort((x, y) => {
      if (x.label < y.label) {
        return -1;
      } else if (x.label > y.label) {
        return 1;
      } else {
        return 0;
      }
    });
    setCountData(countArray);
  }

  async function onSubmit(event: any) {
    event.preventDefault();
    setData([]);
    setLoading(true);
    await fetchData(userInput, setData, setCountData);
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
        <FormattedMessage id="crawlCNN.summit" />
      </button>
    );
  }

  return (
    <div>
      <main className={style.main}>
        <h3>
          <FormattedMessage id="crawlCNN.title" />
        </h3>
        <div className={style.body}>
          <form onSubmit={onSubmit} className="row align-items-sm-stretch">
            <div className="col-sm-10 col-md-9 p-2">
              <div className="input-group input-group-sm h-100">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  <FormattedMessage id="crawlCNN.keyword" />
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
              <FormattedMessage id="crawlCNN.description" />
            </li>
          </ul>
          <div>
            <div
              className={style.list_container + " bg-secondary w-100"}
              ref={listContainer}
            >
              <CNNList listData={data} />
            </div>
            <div className={style.chart_container}>
              <Bar ref={chartRef} options={options} data={chartData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
