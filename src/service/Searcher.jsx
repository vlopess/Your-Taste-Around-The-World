import {GoogleGenerativeAI} from "@google/generative-ai";

class Seacher {
    API_URL = 'https://api.openai.com/v1/chat/completions';
    API_KEY = 'AIzaSyBdrmIAj3Gk5eoIDw5LKJQEr14Cp298vS0';
    genAI = new GoogleGenerativeAI(
        this.API_KEY
    );
    async fetchData(list) {
        if(list.length === 0) return;
        function handleList(list) {
            let names = [];
            list.map((item) => {
                names.push(item.name);
            });
            return `Para as seguintes bandas: ${names.join()}. Retorne um JSON com os seguintes dados para cada banda, pegue os dados corretamente: {"nome": "Nome da Banda", "cidade": "Cidade de Origem", "país": "País de Origem"}.`
        }

        const requestBody = handleList(list);

        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(requestBody);
            const response = await result.response;
            let text = response.text();
            text = text.replace("```json","").replace("```","")
            return JSON.parse(text);
        } catch (e) {
            console.log(`Something Went Wrong: ${e}`);
        }
    }
}
export default Seacher;