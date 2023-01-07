import { openApiKey } from '../config/openApiKey';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: openApiKey,
});
const openai = new OpenAIApi(configuration);

export const getAnswer = async (message: string): Promise<any> => {
    return await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }).then((res) => res.data.choices[0].text);
}