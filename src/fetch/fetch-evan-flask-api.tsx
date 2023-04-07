import {
  Api_Flask_Leetcode,
  Api_Flask_Reddit,
  Api_Flask_ScrabbleHelper,
  Api_Flask_Crypto,
  Api_Flask_CryptoDetail,
  Api_Flask_CNN,
} from "golbal/constants";

interface IEvanAPIReceive<T>
{
  code: string; 
  message: string;
  data: T;
}

export interface ICrawlLeetcodeData
{
  record:
  {
    acRate:number;
    difficulty: string;
    frontendQuestionId: string;
    tags:Array<string>;
    title: string;
}[],
  tag: {
    acceptance: number;
    count: number;
    difficulty: string;
    tag: string;
  }[]
}

export interface ICrawlRedditData
{
  author:string;
  thing: string;
  time:string;
  title: string;
  url:string;
}

export interface IScrabbleHelperData
{
  mean:Array<string>;
  word: string;
  translated:string;
}

export interface ICrawlCryptoData
{
  name: string;
  price: string;
  change: string;
  changeRate: string;
}

export interface ICrawlCryptoDetailData
{
  indicators:
  {
    quote:
    {
      close: Array<number>;
      high: Array<number>;
      low: Array<number>;
      open: Array<number>;
      volume: Array<number>;
    }[]
  },
  timestamp: Array<number>;
}

export interface ICrawlCNNData
{
  category: string;
  firstPublish: string;
  lastPublish: string;
  headline: string;
  url: string;
}

export async function FetchEvanAPI_CrawlLeetcode_Get (limit:number, skip:number) :Promise<IEvanAPIReceive<ICrawlLeetcodeData>>{
  try {
    //console.log(Api_Flask_Leetcode + "?skip=" + skip + "&limit=" + limit);
    const response = await fetch(
      Api_Flask_Leetcode + "?skip=" + skip + "&limit=" + limit,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    return json;
  } catch (ex:any) {
    return {
      code: "A990",
      message: ex.message,
      data : {record:[] ,tag:[]}
    };
  }
}

export async function FetchEvanAPI_CrawlReddit_Get(subreddit:string, lastThing:string) :Promise<IEvanAPIReceive<Array<ICrawlRedditData>>> {
  try {
    const response = await fetch(
      Api_Flask_Reddit + "?subreddit=" + subreddit + "&lastThing=" + lastThing,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return json;
  } catch (ex:any) {
    return {
      code: "A990",
      message: ex.message,
      data : []
    };
  }
}

export async function FetchEvanAPI_ScrabbleHelper_Get(word:string, translate:string) :Promise<IEvanAPIReceive<Array<IScrabbleHelperData>>> {
  try {
   
    const response = await fetch(
      Api_Flask_ScrabbleHelper + "?word=" + word + "&translate=" + translate,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return json;
  } catch (ex:any) {
    return {
      code: "A990",
      message: ex.message,
      data : []
    };
  }
}

export async function FetchEvanAPI_CrawlCrypto_Get() :Promise<IEvanAPIReceive<Array<ICrawlCryptoData>>> {
  try {
   
    const response = await fetch(
      Api_Flask_Crypto ,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return json;
  } catch (ex:any) {
    return {
      code: "A990",
      message: ex.message,
      data : []
    };
  }
}

export async function FetchEvanAPI_CrawlCryptoDetail_Get(crypto:string) :Promise<IEvanAPIReceive<ICrawlCryptoDetailData>> {
  try {
   
    const response = await fetch(
      Api_Flask_CryptoDetail + "?crypto=" + crypto ,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return json;
  } catch (ex:any) {
    return {
      code: "A990",
      message: ex.message,
      data : {indicators:{quote:[]} ,timestamp:[]}
    };
  }
}

export async function FetchEvanAPI_CrawlCNN_Get(word:string, size:number, skip:number) :Promise<IEvanAPIReceive<Array<ICrawlCNNData>>> {
  try {
    const response = await fetch(
      Api_Flask_CNN + "?word=" + word + "&size=" + size+"&skip="+skip,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return json;
  } catch (ex:any) {
    return {
      code: "A990",
      message: ex.message,
      data : []
    };
  }
}
