import Style from "../index.module.css";
import Bookmark from "images/bookmark-check.svg";
import BookmarkFill from "images/bookmark-check-fill.svg";
import GraphicsBase from "images/graphics-base.jpg";
import { FetchEvanAPI_Picture_Put } from "fetch/fetch-evan-dotnet-api";
import { useGuestStateContext } from "provider/guest-provider";
import { useState } from "react";
import {IOwnListData,IExhibitData} from "pages/Gallery";
import CustomScrollbar from 'components/custom-scroll';

interface Props {
  id:number;
  url:string;
  createdTime:string;
  prompt:string;
  entries:number;
  setOwnList:any;
  setExhibitList:any;
  setLightToggler: any;
  setLightSource: any;
}

export default function OwnGraphicsItem({
  id,
  url,
  createdTime,
  prompt,
  entries,
  setOwnList,
  setExhibitList,
  setLightToggler,
  setLightSource
}:Props) {
  const [loaded, setLoaded] = useState(false);
  const guest = useGuestStateContext();

  async function SetEntries() {
    try {
      const evanRes = await FetchEvanAPI_Picture_Put(guest.Ip, id);
      if (evanRes.code !== "0000") {
        throw new Error("FetchEvanAPI_Graphics_Put:"+evanRes.message);
      }

      setOwnList((prev:Array<IOwnListData>) => {
        const found = prev.find((x) => x.id === id);
        if(found!== undefined) {
          found.entries = true;
        }
        return [...prev];
      });

      setExhibitList((prev:Array<IExhibitData>) => {
        return [
          ...prev,
          {
            id: id,
            url: url,
            createdTime: Date.now,
            prompt: prompt,
            word1: guest.GuestNameWord1,
            word2: guest.GuestNameWord2,
            word3: guest.GuestNameWord3,
            likes: 0,
            acterLikes: 0,
          },
        ];
      });
    } catch (ex) {
      console.error(ex);
    }
  }

  var entriesItem;
  if(id === 0)
  {
    entriesItem=<></>
  }
  else{
    if (entries === 1) {
      entriesItem = (
        <img className={Style.ownlist_entries_check} src={BookmarkFill} alt="" />
      );
    } else {
      entriesItem = (
        <img
          className={Style.ownlist_entries}
          src={Bookmark}
          alt=""
          onClick={SetEntries}
        />
      );
    }}

  var promptItem;
  if (id !== 0) {
    promptItem = (
      <figcaption className="lh-sm text-white-50">{prompt}</figcaption>
    );
  } else {
    promptItem = (
      <figcaption className="lh-sm text-light">Loading...</figcaption>
    );
  }

  function imageLoaded() {
    setLoaded(true);
  }

  function trunLightBox() {
    setLightSource([url]);
    setLightToggler((prev:boolean)=>{return !prev});
  }

  return (
    <div className="card bg-dark shadow">
      <div className="card-img-top">
        <img
          className={
            "w-100 " +
            (id === 0 ? Style.ownlist_paint_image + " " : Style.image_actived + " ") +
            (loaded ? "" : "d-none")
          }
          src={url}
          alt=""
          onLoad={imageLoaded}
          onClick={trunLightBox}
        />
        <img
          className={
            "w-100 " +
            (id === 0 ? Style.ownlist_paint_image + " " : "") +
            (loaded ? "d-none" : "")
          }
          src={GraphicsBase}
          alt=""
        />
      </div>
      <div className="card-body d-flex justify-content-between">
        <CustomScrollbar style={{  height: 40 }}>
          {promptItem}
        </CustomScrollbar>
        {entriesItem}
      </div>
    </div>
  );
}
