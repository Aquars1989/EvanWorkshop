import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface IOpenAIApiReceive 
{
  code: string, 
  message: string,
  data: string
}

export async function FetchOpenAiImage(userInput:string) :Promise<IOpenAIApiReceive> {
  if (!configuration.apiKey) {
    return { code: "O001", message: "OpenAI API key not configured", data:"" };
  }

  //console.log(userInput);
  const text = userInput || "";
  if (text.trim().length === 0) {
    return { code: "O002", message: "Please enter the word", data:"" };
  }

  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: "512x512",
    });
    return { code: "0000", message: "Ok", data: response.data.data[0].url||"" };
  } catch (error:any) {
    if (error.response) {
      console.log(error.response.status, error.response.data);
      return { code: "O990", message: error.response.data.error.message, data:"" };
    } else {
      console.log(`Error with OpenAI API request: ${error.message}`);
      return { code: "O990", message: error.message.error.message , data:""};
    }
  }
}

export async function FetchOpenAiChat(userInput:string) :Promise<IOpenAIApiReceive>{
  if (!configuration.apiKey) {
    return { code: "O101", message: "OpenAI API key not configured", data:"" };
  }

  //console.log(userInput);
  const text = userInput || "";
  if (text.trim().length === 0) {
    return { code: "O102", message: "Please enter the word", data:"" };
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.75,
      max_tokens: 30,
    });
    return { code: "0000", message: "Ok", data: completion.data.choices[0].text||"" };
  } catch  (error:any) {
    if (error.response) {
      console.log(error.response.status, error.response.data);
      return { code: "O990", message: error.response.data.error.message, data:"" };
    } else {
      console.log(`Error with OpenAI API request: ${error.message}`);
      return { code: "O990", message: error.message.error.message , data:""};
      }
    }
  }