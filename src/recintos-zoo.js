class RecintosZoo {
    constructor() {
        this.animais = {
            "LEAO": { tamanho: 3, bioma: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, bioma: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, bioma: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, bioma: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
        };

        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {
       
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

      
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, bioma, carnivoro } = this.animais[animal];
        const espacoNecessario = quantidade * tamanho;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
         
            if (!bioma.includes(recinto.bioma) && recinto.bioma !== "savana e rio") {
                continue;
            }

           
            let espacoOcupado = recinto.animais.reduce((sum, { especie, quantidade }) => {
                const espacoAnimal = this.animais[especie].tamanho * quantidade;
                return sum + espacoAnimal;
            }, 0);

           
            if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
                if (carnivoro || this.animais[recinto.animais[0].especie].carnivoro) {
                    continue; 
                }
                espacoOcupado += 1; 
            }

        
            if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
                continue; 
            }

            const espacoDisponivel = recinto.tamanho - espacoOcupado;

            
            if (espacoDisponivel >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        }

        return { erro: "Não há recinto viável" };
    }
}

export { RecintosZoo };
