import {
  Api_NetCore_Guest,
  Api_NetCore_GuestNamePool,
  Api_NetCore_OpenAiPicture,
  Api_NetCore_OpenAiPictureScore,
  Api_NetCore_OpenAiExhibit_GetExhibitions,
  Api_NetCore_OpenAiExhibit_GetMostLiked,
} from "golbal/constants";

interface IEvanAPIReceive {
  code: string;
  message: string;
  data: any;
}

export async function FetchEvanAPI_Guest_Post(
  ip: string
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_Guest, {
      method: "POST",
      body: JSON.stringify({
        ip: ip,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_Guest_Put(
  ip: string,
  id: number
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_Guest, {
      method: "PUT",
      body: JSON.stringify({
        ip: ip,
        guestNamePoolId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_GuestNamePool_Get(
  ip: string
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_GuestNamePool + "?ip=" + ip);
    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_GuestNamePool_Post(
  ip: string,
  count: number
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_GuestNamePool, {
      method: "POST",
      body: JSON.stringify({
        ip: ip,
        count: count,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_Picture_Get(
  ip: string
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_OpenAiPicture + "?ip=" + ip);
    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_Picture_Post(
  ip: string,
  prompt: string
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_OpenAiPicture, {
      method: "POST",
      body: JSON.stringify({
        ip: ip,
        prompt: prompt,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_Picture_Put(
  ip: string,
  id: number
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_OpenAiPicture + "/" + id, {
      method: "PUT",
      body: JSON.stringify({
        ip: ip,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_Score_Post(
  ip: string,
  id: number
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(Api_NetCore_OpenAiPictureScore, {
      method: "POST",
      body: JSON.stringify({
        ip: ip,
        id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_Exhibitions_Get(
  ip: string,
  last: number,
  count: number
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(
      Api_NetCore_OpenAiExhibit_GetExhibitions +
        `?ip=${ip}&last=${last}&count=${count}`
    );
    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}

export async function FetchEvanAPI_MostLiked_Get(
  ip: string,
  count: number
): Promise<IEvanAPIReceive> {
  try {
    const response = await fetch(
      Api_NetCore_OpenAiExhibit_GetMostLiked + `?ip=${ip}&count=${count}`
    );
    const json = await response.json();
    return json;
  } catch (ex: any) {
    return {
      code: "A990",
      message: ex.message,
      data: null,
    };
  }
}
