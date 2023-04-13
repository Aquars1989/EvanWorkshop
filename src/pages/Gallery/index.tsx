import { useState, useEffect, useMemo } from "react";
import OwnGraphicsList from "./components/own-graphics-list";
import ExhibitGraphicsList from "./components/exhibit-graphics-list";
import CarouselGraphicsContiner from "./components/carousel-graphics-continer";
import {FetchEvanAPI_OpenArt_Get} from "fetch/fetch-evan-flask-api";
//import {FetchOpenAiImage} from "fetch/fetch-openai";
import {
  FetchEvanAPI_Picture_Get,
  FetchEvanAPI_Picture_Post,
  FetchEvanAPI_Score_Get,
} from "fetch/fetch-evan-dotnet-api";
import { useGuestStateContext } from "provider/guest-provider";
import Style from "./index.module.css";
import { useIntl, FormattedMessage } from "react-intl";
import { FormatError } from "fetch/error-format";

export interface IOwnListData{
  id: number;
  url: string;
  createdTime:string;
  prompt: string;
  entries: boolean;
}

export interface IExhibitData{
  id: number,
  url: string;
  createdTime: string;
  prompt: string;
  word1: string;
  word2: string;
  word3: string;
  likes: number;
  acterLikes: number;
}

export default function Gallery() {
  const [userInput, setUserInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [ownList , setOwnList] = useState([] as Array<IOwnListData> );
  const [exhibitList, setExhibitList] = useState([] as Array<IExhibitData>);

  const guest = useGuestStateContext();
  const intl = useIntl();

  const ownGraphicsList = useMemo(() => {
    return (
      <OwnGraphicsList
        ownList={ownList}
        pending={pending}
        setOwnList={setOwnList}
        setExhibitList={setExhibitList}
      />
    );
  }, [ownList, pending]);

  const carouselGraphicsContiner = useMemo(() => {
    return (
      <CarouselGraphicsContiner
        exhibitList={exhibitList}
        setExhibitList={setExhibitList}
      />
    );
  }, [exhibitList]);

  const exhibitGraphicsList = useMemo(() => {
    return (
      <ExhibitGraphicsList
        exhibitList={exhibitList}
        setExhibitList={setExhibitList}
      />
    );
  }, [exhibitList]);

  useEffect(() => {
    if (guest.Ip === "") return;

    const fetchData = async () => {
      const evanRes = await FetchEvanAPI_Picture_Get(guest.Ip);

      let list:Array<IOwnListData> = [];
      if (evanRes.code === "0000") {
        for (let i = 0; i < evanRes.data.length; i++) {
          const element = evanRes.data[i];
          list.push({
            id: element.id,
            url: element.url,
            createdTime: element.createdTime,
            prompt: element.prompt,
            entries: element.entries,
          });
        }
      }
      setOwnList(list);
    };
    fetchData();
  }, [guest]);

  useEffect(() => {
    if (guest.Ip === "") return;

    const fetchData = async () => {
      const evanRes = await FetchEvanAPI_Score_Get(guest.Ip);

      let list:Array<IExhibitData> = [];
      if (evanRes.code === "0000") {
        for (let i = 0; i < evanRes.data.length; i++) {
          const element = evanRes.data[i];
          list.push({
            id: element.id,
            url: element.url,
            createdTime: element.createdTime,
            prompt: element.prompt,
            word1: element.word1,
            word2: element.word2,
            word3: element.word3,
            likes: element.likes,
            acterLikes: element.acterLikes,
          });
        }
      }
      setExhibitList(list);
    };
    fetchData();
  }, [guest]);

  async function onSubmit(event: any) {
    event.preventDefault();
    if (pending) return;

    if (userInput.length === 0) {
      setError(intl.formatMessage({ id: "gallery.inputEmpty" }));
      return;
    }
    if (ownList.length >= 5) {
      setError(intl.formatMessage({ id: "gallery.overLimit" }));
      return;
    }

    const input = userInput;
    setUserInput("");
    setPending(true);

    try {
      //const openAIRes = await FetchOpenAiImage(input);
      const openAIRes = await FetchEvanAPI_OpenArt_Get(input);
      //console.log(openAIRes);

      if (openAIRes.code !== "0000") {
        //console.log(FormatError(intl,openAIRes));
        setError(FormatError(intl, openAIRes));
        throw new Error("FetchOpenAI:"+openAIRes.message);
      }
      const evanRes = await FetchEvanAPI_Picture_Post(
        guest.Ip,
        openAIRes.data,
        input
      );

      if (evanRes.code !== "0000") {
        setError(FormatError(intl, evanRes));
        throw new Error("FetchEvanAPI_Picture_Post:"+evanRes.message);
      }

      const evanItem = evanRes.data;
      setOwnList((prev) => {
        return [
          ...prev,
          {
            id: evanItem.id,
            url: evanItem.url,
            createdTime: evanItem.createdTime,
            prompt: evanItem.prompt,
            entries: evanItem.entries,
          },
        ];
      });
      setError("");
    } catch (ex) {
      console.error(ex);
    }
    setPending(false);
  }
  var summitButton;
  if (pending) {
    summitButton = (
      <button
        type="submit"
        className="btn btn-primary w-100 p-2 my-1 mx-md-2 disabled"
      >
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    );
  } else {
    summitButton = (
      <button type="submit" className="btn btn-primary w-100 p-2 my-1 mx-md-2">
        <FormattedMessage id="gallery.summit" />
      </button>
    );
  }

  var errorMsg;
  if (error !== "") {
    errorMsg = <div className="txt-err1 px-2">{error}</div>;
  }

  return (
    <div className={Style.main + " container-fluid bg-gradient bg-dark p-5"}>
      <h2 className="mt-3">
        <FormattedMessage id="gallery.drawMyPicture" />
      </h2>
      <form onSubmit={onSubmit} className="px-1">
        <div className="row align-items-center">
          <div className="col-sm-10 col-md-7">
            <input
              type="text"
              name="prompt"
              placeholder={intl.formatMessage({
                id: "gallery.inputDescription",
              })}
              value={userInput}
              className="w-100 p-2 my-1 mx-md-2"
              maxLength={100}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <div className="col-sm-10 col-md-3">{summitButton}</div>
        </div>
        {errorMsg}
        <ul className="px-1 mb-3 txt-tip1">
          <li>
            <FormattedMessage id="gallery.description1" />
          </li>
          <li>
            <FormattedMessage id="gallery.description2" />
          </li>
          <li>
            <FormattedMessage id="gallery.description3" />
          </li>
        </ul>
      </form>

      <div className="px-1">{ownGraphicsList}</div>

      <h2 className="mt-3">
        <FormattedMessage id="gallery.favorite" />
      </h2>
      <div className="px-1">{carouselGraphicsContiner}</div>

      <h2 className="mt-3">
        <FormattedMessage id="gallery.exhibition" />
      </h2>
      <div className="px-1">{exhibitGraphicsList}</div>
    </div>
  );
}
