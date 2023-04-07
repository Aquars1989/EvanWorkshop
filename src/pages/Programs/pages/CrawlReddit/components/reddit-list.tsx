import RedditItem from "./reddit-item";
import { v4 } from "uuid";
import { ICrawlRedditData } from "fetch/fetch-evan-flask-api";

interface Props{
  listData:Array<ICrawlRedditData>
}

export default function RedditList({ listData }:Props) {
  return (
    <div >
      {listData.map((item) => {
        const { url, title, author, time } = item;
        return (
          <RedditItem
            key={v4()}
            url={url}
            title={title}
            author={author}
            time={time}
          />
        );
      })}
    </div>
  );
}
