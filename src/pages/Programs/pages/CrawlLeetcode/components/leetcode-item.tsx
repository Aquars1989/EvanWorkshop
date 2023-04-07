import { v4 } from "uuid";
import style from "../index.module.css";

interface Props {
  frontendQuestionId:number,
  title:string,
  difficulty:number,
  acRate:string,
  tags:Array<any>,
}

export default function LeetcodeItem({
  frontendQuestionId,
  title,
  difficulty,
  acRate,
  tags,
}:Props) {
  return (
    <tr>
      <td>{frontendQuestionId}</td>
      <td>{title}</td>
      <td>{difficulty}</td>
      <td>{parseFloat(acRate).toFixed(2)}%</td>
      <td>
        {tags.map((x) => {
          return (
            <span key={v4()} className={style.tag}>
              {x}
            </span>
          );
        })}
      </td>
    </tr>
  );
}
