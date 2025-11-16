// Se você está em um ambiente Node.js mais antigo, pode precisar de: import fetch from 'node-fetch';

class Seacher {
    // A CHAVE DEVE SER LIDA DO AMBIENTE, mas estamos usando a propriedade para este exemplo de teste.
    API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    // Removido o genAI = new GoogleGenerativeAI(...) pois não usaremos o SDK.

    async fetchData(list) {
        console.log(list);
        if(list.length === 0) return;

        function handleList(list) {
            let names = [];
            list.map((item) => {
                names.push(item.name);
            });
            // Sua string de prompt original
            return `Para as seguintes bandas: ${names.join()}.
             Retorne um JSON com os seguintes dados para cada banda,
             assegurando que os dados estejam corretos. Por favor,
             não inclua a cidade; quero apenas o estado, província,
             distrito ou condado. O formato deve ser: 
             {"nome": "Nome da Banda", 
             "origem": "Apenas o Estado (sem a cidade ou distrito, com underscore entre as palavras)", 
             "sigla": "País de Origem (SIGLA EM INGLES)"}, "país": "País de Origem"}.`
        }

        const promptText = handleList(list);

        // 1. Definição da URL e Chave
        const MODEL_NAME = "gemini-2.5-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${this.API_KEY}`;

        // 2. Criação do Body JSON (como no curl)
        const requestBody = JSON.stringify({
            "contents": [
                {
                    "parts": [
                        {
                            "text": promptText
                        }
                    ]
                }
            ]
        });

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            // 3. Verifica o Status da Resposta
            if (!response.ok) {
                // Se a chave for inválida ou o modelo não for encontrado,
                // o servidor retornará um erro que será capturado aqui.
                const errorData = await response.json();
                console.error("Erro da API:", errorData);
                throw new Error(`Erro HTTP: ${response.status} - ${errorData.error.message}`);
            }

            // 4. Processa a Resposta JSON
            const data = await response.json();

            // O texto da resposta está em data.candidates[0].content.parts[0].text
            let text = data.candidates[0].content.parts[0].text;

            // Limpeza do texto para parsing JSON
            // Remove ```json no início e ``` no final, ignorando espaços/quebras
            text = text.replace(/```json\s*/, '').replace(/```\s*$/, '');

            return JSON.parse(text);

        } catch (e) {
            console.log(`Something Went Wrong: ${e}`);
        }
    }
}
export default Seacher;