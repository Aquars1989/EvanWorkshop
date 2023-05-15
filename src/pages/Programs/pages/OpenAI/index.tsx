import { useState } from "react";
import style from "./index.module.css";
import ChartList from "./components/chartopt-chat-list";
//import { FetchOpenAiChat } from "fetch/fetch-openai";
import Moment from "moment";
import { v4 } from "uuid";
import { useIntl, FormattedMessage } from "react-intl";

export interface IChatMessage {
  id: string;
  message: string;
  sendTime: string;
  type: string;
}

export default function OpenAI() {
  const [userInput, setUserInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messageList, setMessageList] = useState([] as Array<IChatMessage>);
  const intl = useIntl();

  async function onSubmit(event: any) {
    /*
    event.preventDefault();

    if (userInput.length === 0 || pending) return;

    setMessageList((prev: Array<IChatMessage>) => {
      return [
        ...prev,
        {
          id: v4(),
          message: userInput,
          sendTime: Moment(Date.now()).format("hh:mm:ss"),
          type: "input",
        },
      ];
    });
    setUserInput("");
    setPending(true);
    var data = {}//await FetchOpenAiChat(userInput);
    setPending(false);
    setMessageList((prev) => {
      if (data.code === "0000") {
        return [
          ...prev,
          {
            id: v4(),
            message: data.data,
            sendTime: Moment(Date.now()).format("hh:mm:ss"),
            type: "result",
          },
        ];
      } else {
        return [
          ...prev,
          {
            id: v4(),
            message: data.message,
            sendTime: Moment(Date.now()).format("hh:mm:ss"),
            type: "error",
          },
        ];
      }
    });*/
  }

  var summitButton;
  if (pending) {
    summitButton = (
      <button type="submit" className="btn btn-primary w-100 h-100 disabled">
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    );
  } else {
    summitButton = (
      <button type="submit" className="btn btn-primary w-100 h-100">
        <FormattedMessage id="openai.summit" />
      </button>
    );
  }

  return (
    <div>
      <main className={style.main}>
        <h3>ChatGPT</h3>
        <div className={"card " + style.card}>
          <form
            onSubmit={onSubmit}
            className="row align-items-sm-stretch px-3 pt-1"
          >
            <div className="col-sm-12 col-md-9 p-2">
              <input
                type="text"
                name="userSay"
                placeholder={intl.formatMessage({
                  id: "openai.inputDescription",
                })}
                value={userInput}
                className="form-control"
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <div className="col-sm-12 col-md-3 p-2">{summitButton}</div>
          </form>
          <div className="p-3">
            <ChartList messageList={messageList} pending={pending} />
          </div>
        </div>
      </main>
    </div>
  );
}
