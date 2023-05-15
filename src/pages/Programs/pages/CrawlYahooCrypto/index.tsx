import { useState, useEffect, useRef } from "react";
import style from "./index.module.css";
import CryptoList from "./components/crypto-list";
import { useIntl, FormattedMessage } from "react-intl";
import { Line } from "react-chartjs-2";
import {
  FetchEvanAPI_CrawlCrypto_Get,
  FetchEvanAPI_CrawlCryptoDetail_Get,
  ICrawlCryptoData,
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
  name: string;
  values: Array<number>;
}

export default function CrawlYahooCrypto() {
  const chartRef = useRef(null);
  const listContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([] as Array<ICrawlCryptoData>);
  const [countLabel, setCountLabel] = useState([] as Array<string>);
  const [countData, setCountData] = useState([] as Array<IChartCount>);
  const [chartData, setChartData] = useState({
    datasets: [],
  } as ChartData<"line", any>);
  const intl = useIntl();

  useEffect(() => {
    if (listContainer.current) {
      listContainer.current.scrollTop = listContainer.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const datasets = new Array<any>();
      if (countData.length >= 1) {
        datasets.push({
          label: countData[0].name,
          data: countData[0].values,
          backgroundColor: "rgba(255, 0, 0)",
          borderColor: "rgba(255, 0, 0)",
          borderWidth:1.5,
          pointBorderWidth:0,
          pointRadius:0,
          fill: false
        });
      }

      if (countData.length >= 2) {
        datasets.push({
          label: countData[1].name,
          data: countData[1].values,
          backgroundColor: "rgba(0, 0, 255)",
          borderColor: "rgba(0, 0, 255)",
          borderWidth:1.5,
          pointBorderWidth:0,
          pointRadius:0,
          fill: false
        });
      }

      if (countData.length >= 3) {
        datasets.push({
          label: countData[2].name,
          data: countData[2].values,
          backgroundColor: "rgba(0, 255,0 )",
          borderColor: "rgba(0, 255, 0)",
          borderWidth:1.5,
          pointBorderWidth:0,
          pointRadius:0,
          fill: false
        });
      }

      if (countData.length >= 4) {
        datasets.push({
          label: countData[3].name,
          data: countData[3].values,
          backgroundColor: "rgba(255, 0, 255)",
          borderColor: "rgba(255, 0, 255)",
          borderWidth:1.5,
          pointBorderWidth:0,
          pointRadius:0,
          fill: false
        });
      }

      if (countData.length >= 5) {
        datasets.push({
          label: countData[4].name,
          data: countData[4].values,
          backgroundColor: "rgba(0, 255, 255)",
          borderColor: "rgba(0, 255, 255)",
          borderWidth:1.5,
          pointBorderWidth:0,
          pointRadius:0,
          fill: false
        });
      }

      //console.log(datasets);

      setChartData({
        labels: countLabel,
        datasets: datasets
      });
    }
  }, [countLabel, countData]);

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
        text:intl.formatMessage({id: "crawlCrypto.chartTitle"})
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    scales: {
      x: {
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
        grid: {
          drawBorder: true,
          color: "#FFFFFF20",
        },
        ticks: {
          color: "#FFFFFF80",
        },
        border: {
          color: "#FFFFFF80",
        },
      },
    },
  };

  async function fetchData() {
    setCountData([]);
    const evanRes = await FetchEvanAPI_CrawlCrypto_Get();
    if (evanRes.code !== "0000") return;
    if (evanRes.data.length === 0) return;
    setData(evanRes.data);

    const chartSkip=["USDT-USD","USDC-USD"];
    const label = [];
    let count=0
    for (let i = 0; i < evanRes.data.length && count < 5; i++) {
      const name = evanRes.data[i].name;

      if(chartSkip.indexOf(name)>=0) continue;
      count+=1;

      const evanResDetail = await FetchEvanAPI_CrawlCryptoDetail_Get(name);
      if (evanResDetail.code !== "0000") continue;

      const detailData = evanResDetail.data;
      const values: Array<number> = [];
      const fixTime = intl.locale.includes("zh") ? 60 * 60 * 16 : 0;
      let baseValue = 0;
      if (label.length === 0) {
        for (let i = 0; i < detailData.timestamp.length; i++) {
          const time = new Date(1970, 0, 1);
          time.setSeconds(detailData.timestamp[i] + fixTime);
          label[i] = time.toISOString().slice(11, 16);
          setCountLabel(label);
        }
      }
      for (let i = 0; i < label.length; i++) {
        const value = detailData.indicators.quote[0].close[i];
        if (i === 0) {
          baseValue = value;
          values[i] = 0;
        } else {
          values[i] = (value / baseValue) -1;
        }
      }
      setCountData((prev) => {
        return [...prev, { name: name, values: values }];
      });
    }
  }

  async function LoadButtomClick() {
    setData([]);
    setLoading(true);
    await fetchData();
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
      <button
        type="submit"
        className="btn btn-primary w-100 h-100"
        onClick={LoadButtomClick}
      >
        <FormattedMessage id="crawlCrypto.summit" />
      </button>
    );
  }

  return (
    <div>
      <main className={style.main}>
        <h3>
          <FormattedMessage id="crawlCrypto.title" />
        </h3>
        <div className={style.body}>
          <div className="p-2">{summitButton}</div>
          <ul className="txt-tip1">
            <li>
              <FormattedMessage id="crawlCrypto.description" />
            </li>
          </ul>
          <div>
            <div
              className={style.list_container + " bg-secondary w-100"}
              ref={listContainer}
            >
              <CryptoList listData={data} />
            </div>
            <div className={style.chart_container}>
              <Line ref={chartRef} options={options} data={chartData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
