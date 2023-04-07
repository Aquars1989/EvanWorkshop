import style from "../index.module.css";

interface Props 
{
  url:string,
  title:string, 
  author:string, 
  time:string 
}

export default function RedditItem({ url, title, author, time }:Props) {
  return (
    <div className={style.item}>
      <div>
        <a className={style.item_title} href={url}>
          {title}
        </a>
      </div>
      <span className={style.item_author}>{author}</span>
      <span className={style.item_time}>{time}</span>
    </div>
  );
}
