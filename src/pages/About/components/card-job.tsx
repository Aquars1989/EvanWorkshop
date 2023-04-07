import { ReactNode } from "react";
import Style from "../index.module.css";

interface Props {
  title: string;
  time: string;
  workAs: string;
  during: string;
  description: string;
  tag: Array<ReactNode>;
}

export default function CardJob({ title, time , workAs, during, description, tag }:Props) {
  return (
    <div className={"card w-50 shadow mx-auto " + Style.carousel_card}>
        <div className={"card-header " + Style.carousel_card_head}>
          <div className="card-title"><h5><b>{title}</b></h5></div>
          <div className="card-subtitle row align-items-md-stretch">
            <div className="col-md-6"><b>{workAs}</b></div>
            <div className="col-md-6">{during}</div>
          </div>
        </div>
        <div className="card-body overflow-auto">
          <ul>
            {description.split(';').map((x)=>{return <li>{x}</li>})}
          </ul>
        </div>
        <div className="card-footer">
          {tag.map((item) => {return item; })}
        </div>
    </div>
  );
}
