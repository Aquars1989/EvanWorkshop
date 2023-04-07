import style from "../index.module.css";
import GuestIconBase from "images/guest-icon-base.svg";
import { useIntl, FormattedMessage } from "react-intl";
import { FetchEvanAPI_Guest_Put } from "fetch/fetch-evan-dotnet-api";
import { FormatError } from "fetch/error-format";
import {
  useGuestStateContext,
  useGuestDispatchContext,
} from "provider/guest-provider";

interface Props {
  id: number;
  word1: string;
  word2: string;
  word3: string;
  setError: any;
}

export default function IconChangeItem({
  id,
  word1,
  word2,
  word3,
  setError,
}: Props) {
  const intl = useIntl();
  const guest = useGuestStateContext();
  const guestDispatch = useGuestDispatchContext();

  async function OnClick() {
    var evanRes = await FetchEvanAPI_Guest_Put(guest.Ip, id);
    //console.log(evanRes);
    if (evanRes.code === "0000") {
      guestDispatch({
        Ip: guest.Ip,
        GuestName: evanRes.data.name,
        GuestNameWord1: evanRes.data.word1,
        GuestNameWord2: evanRes.data.word2,
        GuestNameWord3: evanRes.data.word3,
      });
    } else {
      console.log(evanRes);
      setError(FormatError(intl, evanRes));
    }
  }

  const guestName = word1 + " " + word2 + " " + word3;
  var current = "";
  if (
    guest.GuestNameWord1 === word1 &&
    guest.GuestNameWord2 === word2 &&
    guest.GuestNameWord3 === word3
  ) {
    current = style.item_current;
  }

  return (
    <div
      className={"text-info text-center shadow  bg-dark btn " + current}
      onClick={OnClick}
    >
      <img
        className={"guest-icon guest-icon-change m-2 " + guestName}
        src={GuestIconBase}
        alt={guestName}
      />
      <div className="row align-items-sm-center">
        <div className="col-sm-6 text-sm-end p-0">
          <FormattedMessage id={"words2." + word2} />
        </div>
        <div className="col-sm-6 text-sm-start p-0">
          <FormattedMessage id={"words3." + word3} />
        </div>
      </div>
    </div>
  );
}
