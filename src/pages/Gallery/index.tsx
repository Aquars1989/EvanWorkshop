import { useState, useEffect, useMemo, useCallback } from "react";
import OwnGraphicsList from "./components/own-graphics-list";
import ExhibitGraphicsList from "./components/exhibit-graphics-list";
import CarouselGraphicsContiner from "./components/carousel-graphics-continer";
import { FetchEvanAPI_OpenArt_Get } from "fetch/fetch-evan-flask-api";
//import {FetchOpenAiImage} from "fetch/fetch-openai";
import {
  FetchEvanAPI_Picture_Get,
  FetchEvanAPI_Picture_Post,
  FetchEvanAPI_Exhibitions_Get,
  FetchEvanAPI_MostLiked_Get,
} from "fetch/fetch-evan-dotnet-api";
import { useGuestStateContext } from "provider/guest-provider";
import Style from "./index.module.css";
import { useIntl, FormattedMessage } from "react-intl";
import { FormatError } from "fetch/error-format";
import FsLightbox from "fslightbox-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Dot from "images/dot.svg";

export interface IOwnListData {
  id: number;
  url: string;
  createdTime: string;
  prompt: string;
  exhibit: boolean;
}

export interface IExhibitData {
  id: number;
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
  const [ownList, setOwnList] = useState([] as Array<IOwnListData>);
  const [loadEnd, setLoadEnd] = useState(false);
  const [mostLikedList, setMostLikedList] = useState([] as Array<IExhibitData>);
  const [exhibitList, setExhibitList] = useState([] as Array<IExhibitData>);
  const [lightToggler, setLightToggler] = useState(false);
  const [lightSource, setLightSource] = useState([]);

  const guest = useGuestStateContext();
  const intl = useIntl();

  const LoadExhibitions = useCallback(
    async (last: number) => {
      if (guest.Ip === "") return;

      const evanRes = await FetchEvanAPI_Exhibitions_Get(guest.Ip, last, 15);
      //await new Promise((r) => setTimeout(r, 10000));
      let list: Array<IExhibitData> = [];
      if (evanRes.code === "0000") {
        //console.log(last,evanRes.data)
        if (evanRes.data.length < 15) {
          setLoadEnd(true);
        }
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
      setExhibitList((prev: Array<IExhibitData>) => {
        return prev.concat(list);
      });
    },
    [guest]
  );

  const ReLoadExhibitions = useCallback(async () => {
    setExhibitList([] as Array<IExhibitData>);
    setLoadEnd(false);
    await LoadExhibitions(-1);
  }, [LoadExhibitions]);

  const ownGraphicsList = useMemo(() => {
    return (
      <OwnGraphicsList
        ownList={ownList}
        pending={pending}
        setOwnList={setOwnList}
        setExhibitList={setExhibitList}
        setLightToggler={setLightToggler}
        setLightSource={setLightSource}
      />
    );
  }, [ownList, pending]);

  const carouselGraphicsContiner = useMemo(() => {
    return (
      <CarouselGraphicsContiner
        mostLikedList={mostLikedList}
        setMostLikedList={setMostLikedList}
        setLightToggler={setLightToggler}
        setLightSource={setLightSource}
      />
    );
  }, [mostLikedList]);

  const exhibitGraphicsList = useMemo(() => {
    async function ScrollLoadData() {
      if (loadEnd) return;

      let last = -1;
      if (exhibitList.length > 0) {
        last = exhibitList[exhibitList.length - 1].id;
      }
      await LoadExhibitions(last);
    }

    return (
      <InfiniteScroll
        dataLength={exhibitList.length}
        hasMore={!loadEnd}
        loader={
          <div className={Style.load_container}>
            <img className={Style.load_dot+" "+Style.serial1} src={Dot} alt="●"/>
            <img className={Style.load_dot+" "+Style.serial2} src={Dot} alt="●"/>
            <img className={Style.load_dot+" "+Style.serial3} src={Dot} alt="●"/>
            <img className={Style.load_dot+" "+Style.serial4} src={Dot} alt="●"/>
            <img className={Style.load_dot+" "+Style.serial5} src={Dot} alt="●"/>
          </div>
        }
        endMessage={
          <></>
          //<p style={{ textAlign: "center" }}>
          //  <b>No more exhibits to load</b>
          //</p>
        }
        refreshFunction={ReLoadExhibitions}
        next={ScrollLoadData}
        scrollableTarget="html"
      >
        <ExhibitGraphicsList
          exhibitList={exhibitList}
          setExhibitList={setExhibitList}
          setLightToggler={setLightToggler}
          setLightSource={setLightSource}
        />
      </InfiniteScroll>
    );
  }, [exhibitList, loadEnd, LoadExhibitions, ReLoadExhibitions]);

  useEffect(() => {
    if (guest.Ip === "") return;

    const fetchData = async () => {
      const evanRes = await FetchEvanAPI_Picture_Get(guest.Ip);

      let list: Array<IOwnListData> = [];
      if (evanRes.code === "0000") {
        for (let i = 0; i < evanRes.data.length; i++) {
          const element = evanRes.data[i];
          list.push({
            id: element.id,
            url: element.url,
            createdTime: element.createdTime,
            prompt: element.prompt,
            exhibit: element.exhibit,
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
      const evanRes = await FetchEvanAPI_MostLiked_Get(guest.Ip, 5);
      let list: Array<IExhibitData> = [];
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
      setMostLikedList(list);
    };
    fetchData();
  }, [guest]);

  useEffect(() => {
    if (guest.Ip === "") return;
    ReLoadExhibitions();
  }, [guest, ReLoadExhibitions]);

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
        throw new Error("FetchOpenAI:" + openAIRes.message);
      }
      const evanRes = await FetchEvanAPI_Picture_Post(
        guest.Ip,
        openAIRes.data,
        input
      );

      if (evanRes.code !== "0000") {
        setError(FormatError(intl, evanRes));
        throw new Error("FetchEvanAPI_Picture_Post:" + evanRes.message);
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
            exhibit: evanItem.exhibit,
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
    <div className={Style.main + " container p-5"}>
      <div className={Style.background}></div>
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
        <FormattedMessage id="gallery.mostLiked" />
      </h2>
      <div className="px-1">{carouselGraphicsContiner}</div>

      <h2 className="mt-3">
        <FormattedMessage id="gallery.exhibition" />
      </h2>
      <div className="px-1">{exhibitGraphicsList}</div>

      <FsLightbox
        toggler={lightToggler}
        sources={lightSource}
        types={["image"]}
      />
    </div>
  );
}
