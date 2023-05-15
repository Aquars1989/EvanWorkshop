import IconChangeItem from "./icon-change-item";
import { v4 } from "uuid";
import { FormattedMessage } from "react-intl";

interface Props {
  listData: Array<any>;
  setError: any;
}

export default function IconChangeGrid({ listData, setError }:Props) {
  //console.log(listData);
  return (
    <div className="row p-2 bg-secondary">
      {listData.length>0?
      listData.map((item) => {
        const { id, word1, word2, word3 } = item;
        return (
          <div className="col-4 p-1 " key={v4()}>
            <IconChangeItem
              id={id}
              word1={word1}
              word2={word2}
              word3={word3}
              setError={setError}
            />
          </div>
        );
      }):
          <h4 className="text-white-50 text-center">
            <FormattedMessage id={"iconChange.empty"} />
          </h4>}
    </div>
  );
}
