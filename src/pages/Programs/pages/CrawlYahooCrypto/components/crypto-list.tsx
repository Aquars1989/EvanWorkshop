import CryptoItem from "./crypto-item";
import style from "../index.module.css";
import {ICrawlCryptoData} from "fetch/fetch-evan-flask-api"
import { v4 } from "uuid";

interface Props {
  listData:Array<ICrawlCryptoData>
}

export default function CryptoList({ listData }:Props) {
  return (
    <div>
      <table cellPadding="2" border={1} className={style.list}>
      <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Rate(%)</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item) => {
            const { name, price,change, changeRate } = item;
            return (
              <CryptoItem
                key={v4()}
                name={name}
                price={price}
                change={change}
                changeRate={changeRate}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
