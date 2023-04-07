import CNNItem from "./cnn-item";
import style from "../index.module.css";
import {ICrawlCNNData} from "fetch/fetch-evan-flask-api"
import { v4 } from "uuid";

interface Props {
  listData:Array<ICrawlCNNData>
}

export default function CNNList({ listData }:Props) {
  return (
    <div>
      <table cellPadding="2" border={1} className={style.list}>
        <tbody>
          {listData.map((item) => {
            const { headline, url,category, lastPublish } = item;
            return (
              <CNNItem
                key={v4()}
                headline={headline}
                category={category}
                url={url}
                lastPublish={lastPublish}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
