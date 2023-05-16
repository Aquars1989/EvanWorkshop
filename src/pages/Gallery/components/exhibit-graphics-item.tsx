import style from "../index.module.css";
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

export default function ExhibitGraphicsItem({
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

  let likeItem;
  if (acterLikes === 0) {
    likeItem = (
      <img
        className={style.exhibit_likes}
        src={Heart}
        alt=""
        onClick={SetLike}
      />
    );
  } else {
    likeItem = (
      <img className={style.exhibit_likes_check} src={HeartFill} alt="" />
    );
  }

  function imageLoaded() {
    setLoaded(true);
  }

  function trunLightBox() {
    setLightSource([url]);
    setLightToggler((prev: boolean) => {
      return !prev;
    });
  }

  return (
    <div className="card bg-dark shadow">
      <div className="card-head pt-0 pb-0">
        <div className="d-flex justify-content-between align-items-center px-2">
          <div>
            <div className="text-info">
              <img
                className={
                  "guest-icon exhibit " + word1 + " " + word2 + " " + word3
                }
                src={GuestIconBase}
                alt={guest.GuestName}
              />
              <small>
                <FormattedMessage id={"words2." + word2} />
                <span className="me-1"/>
                <FormattedMessage id={"words3." + word3} />
              </small>
            </div>
          </div>
          <div>
            <div className={"d-flex align-items-center my-1 " + style.exhibit_likes_text}>
              <span className="d-sm-none me-1">{likes}</span>
              {likeItem}
            </div>
          </div>
        </div>
      </div>
      <div className="card-img-top">
        <img
          className={
            "w-100 " + style.image_actived + " " + (loaded ? "" : "d-none")
          }
          src={url}
          alt=""
          onLoad={imageLoaded}
          onClick={trunLightBox}
        />
        <img
          className={"w-100 " + (loaded ? "d-none" : "")}
          src={GraphicsBase}
          alt=""
        />
      </div>
      <div className={"card-body " + style.exhibit_prompt}>
        <CustomScrollbar style={{ height: 40  }}>
          <figcaption className={"lh-sm text-white-50 " + style.prompt}>
            {prompt}
          </figcaption>
        </CustomScrollbar>
      </div>
    </div>
  );
}
