import Style from "../index.module.css";
import Heart from "images/heart.svg";
import HeartFill from "images/heart-fill.svg";
import GuestIconBase from "images/guest-icon-base.svg";
import GraphicsBase from "images/graphics-base.jpg";
import { FetchEvanAPI_Score_Post } from "fetch/fetch-evan-dotnet-api";
import { useGuestStateContext } from "provider/guest-provider";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { IExhibitData } from "pages/Gallery";
import CustomScrollbar from "components/custom-scroll";

interface Props {
  id: number;
  url: string;
  createdTime: string;
  prompt: string;
  word1: string;
  word2: string;
  word3: string;
  likes: number;
  acterLikes: number;
  setExhibitList: any;
  setLightToggler: any;
  setLightSource: any;
}

export default function CarouselGraphicsItem({
  id,
  url,
  createdTime,
  prompt,
  word1,
  word2,
  word3,
  likes,
  acterLikes,
  setExhibitList,
  setLightToggler,
  setLightSource,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const guest = useGuestStateContext();

  async function SetLike() {
    try {
      const evanRes = await FetchEvanAPI_Score_Post(guest.Ip, id);
      if (evanRes.code !== "0000") {
        throw new Error("FetchEvanAPI_Score_Post:" + evanRes.message);
      }

      setExhibitList((prev: Array<IExhibitData>) => {
        const found = prev.find((x) => x.id === id);
        if (found !== undefined) {
          found.likes += 1;
          found.acterLikes += 1;
        }
        return [...prev];
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  var likeItem;
  if (acterLikes === 0) {
    likeItem = (
      <img
        className={Style.exhibit_likes}
        src={Heart}
        alt=""
        onClick={SetLike}
      />
    );
  } else {
    likeItem = (
      <img className={Style.exhibit_likes_check} src={HeartFill} alt="" />
    );
  }

  let objectDate = new Date(createdTime);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  let hour = objectDate.getHours();
  let minute = objectDate.getMinutes();
  let second = objectDate.getSeconds();

  function imageLoaded() {
    setLoaded(true);
  }

  function trunLightBox() {
    setLightSource([url]);
    setLightToggler((prev: boolean) => {
      return !prev;
    });
  }

  let card_title;
  let card_body;
  let card_tailer;
  if (id !== undefined) {
    card_title = (
      <div>
        <div className={"text-info"}>
          <img
            className={
              "guest-icon carousel " + word1 + " " + word2 + " " + word3
            }
            src={GuestIconBase}
            alt={guest.GuestName}
          />
          <small>
            <FormattedMessage id={"words2." + word2} />
            <span> </span>
            <FormattedMessage id={"words3." + word3} />
          </small>
        </div>
      </div>
    );

    card_body = <p className={"card-subtitle "+Style.prompt2}>{prompt}</p>;

    card_tailer = (
      <div className="d-flex justify-content-between">
        <small className="card-text text-muted">
          {year +
            "/" +
            month +
            "/" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second}
        </small>
        <div className={Style.exhibit_likes_text}>
          {likes} {likeItem}
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3 bg-dark shadow">
      <div className="row g-0">
        <div className=" p-1 col-md-6">
          <img
            className={
              "w-100 shadow " +
              Style.image_actived +
              " " +
              (loaded ? "" : "d-none")
            }
            src={url}
            alt=""
            onLoad={imageLoaded}
            onClick={trunLightBox}
          />
          <img
            className={"w-100 shadow " + (loaded ? "d-none" : "")}
            src={GraphicsBase}
            alt=""
          />
        </div>
        <div className="col-md-6">
          <div className={"card-header h-25"}>
            <div className="card-title d-flex justify-content-between px-2">
              {card_title}
            </div>
          </div>
          <div className={"card-body h-50 " + Style.carousel_card_body}>
            <CustomScrollbar style={{ height: 40 }}>
              {card_body}
            </CustomScrollbar>
          </div>
          <div className={"card-footer h-25"}>{card_tailer}</div>
        </div>
      </div>
    </div>
  );
}
