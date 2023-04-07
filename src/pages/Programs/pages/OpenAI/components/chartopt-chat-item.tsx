import style from "../index.module.css";

interface Props
{
  message: string;
  sendTime: string;
  type: string;
}

export default function ChatItem({ message, sendTime, type }:Props) {
  var css = style.input;
  console.log(type);
  switch (type) {
    case "result":
      css = style.result;
      break;
    case "error":
      css = style.error;
      break;
    case "pending":
      css = style.pending;
      break;
    default:
      css = style.input;
      break;
  }

  if (
    type === "result" &&
    message.startsWith("https://oaidalleapiprodscus.blob.core.windows.net")
  ) {
    return (
      <div className={style.frame+" "+ css + " shadow"}>
        <img className={style.image} src={message} alt={message} />
        <p className={style.sendTime}>{sendTime}</p>
      </div>
    );
  } else {
    return (
      <div className={style.frame+" "+ css + " shadow"}>
        <p className={style.message}>{message}</p>
        <p className={style.sendTime}>{sendTime}</p>
      </div>
    );
  }
}
