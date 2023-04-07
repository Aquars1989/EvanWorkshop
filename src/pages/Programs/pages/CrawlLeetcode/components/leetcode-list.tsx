import LeetcodeItem from "./leetcode-item";
import style from "../index.module.css";

interface Props {
  listData:Array<any>
}

export default function LeetcodeList({ listData }:Props) {
  return (
    <div>
      <table cellPadding="2" border={1} className={style.list}>
        <thead>
          <tr>
            <th>Id</th>
            <th>title</th>
            <th>difficulty</th>
            <th>acRate</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item) => {
            const { frontendQuestionId, title, difficulty, acRate, tags } =
              item;
            return (
              <LeetcodeItem
                key={frontendQuestionId}
                frontendQuestionId={frontendQuestionId}
                title={title}
                difficulty={difficulty}
                acRate={acRate}
                tags={tags}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
