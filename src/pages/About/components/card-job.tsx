import { ReactNode } from "react";
import Style from "../index.module.css";
import { FormattedMessage } from "react-intl";

interface Props {
  title: string;
  workAs: string;
  during: string;
  description: string;
  tag: Array<ReactNode>;
}

export default function CardJob({ title, workAs, during, description, tag }:Props) {
  return (
    <div className={"card w-50 shadow mx-auto " + Style.job_card}>
        <div className="card-header">
          <div className="card-title"><h5><b>{title}</b></h5></div>
          <div className="card-subtitle row align-items-md-stretch">
            <div className="col-lg-5"><b>{workAs}</b></div>
            <div className="col-lg-7 text-lg-end">{during}</div>
          </div>
        </div>
        <div className="card-subtitle row align-items-md-stretch">
          <div className="card-body overflow-auto col-md-6">
            <ul>
              {description.split(';').map((x)=>{return <li>{x}</li>})}
            </ul>
          </div>
          <div className="col-md-6 d-none d-md-block p-3">
            <div className={Style.carousel_card_head}><FormattedMessage id="about.use"/></div>
            {tag.map((item) => {return item; })}
          </div>
          <div className="card-footer d-md-none">
            {tag.map((item) => {return item; })}
          </div>
        </div>
        
    </div>
  );
}
