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
            return `Para as seguintes bandas: ${names.join()}. Retorne um JSON com os seguintes dados para cada banda, assegurando que os dados estejam corretos. Por favor, não inclua a cidade; quero apenas o estado, província ou condado. O formato deve ser: {"nome": "Nome da Banda", "origem": "Apenas o Estado (sem a cidade, com underscore entre as palavras)", "país": "País de Origem (SIGLA EM INGLES)"}.`
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