import { useEffect, useRef } from "react";
import style from "../index.module.css";
import ChartItem from "./chartopt-chat-item";

interface Props {
  messageList: Array<any>;
  pending: boolean;
}

export default function ChartList({ messageList, pending }:Props) {
  const listContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listContainer.current) {
      //console.log(listContainer.current.scrollTop)
      listContainer.current.scrollTop = listContainer.current.scrollHeight;
    }
  }, [messageList]);

  var pendingDiv = null;
  if (pending) {
    pendingDiv = (
      <tr>
        <div className={style.pending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-chat-left-dots-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </div>
      </tr>
    );
  }

  return (
    <div className={style.list} ref={listContainer}>
      <table>
        <tbody>
          {messageList.map((item) => {
            const { id, message, sendTime, type } = item;
            return (
              <tr className="h-0" key={id}>
                <ChartItem
                  message={message}
                  sendTime={sendTime}
                  type={type}
                />
              </tr>
            );
          })}
          {pendingDiv}
        </tbody>
      </table>
    </div>
  );
}
