



export default{
    data:()=>({
        pokemonsData: []

    }),
    methods:{
        /*fetchPokemon: async(pokemon) =>{
            const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            const data =await apiResponse.json()
            
            const { name, id, sprites, stats, abilities } = data;
            
            const pokemon = { name: name, id: id, imagens: sprites, status: stats, habilidades: abilities };
            
            this.pokemonsData.push(pokemon)
            console.log(this.pokemonsData)
        },*/
        
        
        get: async()=>{

            for(let i =1; i<150; i++){
            
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            
                const data = await response.json();

                
                let name = data.name;
                let id = data.id;
                let sprites = data.sprites;
                let stats = data.stats;
                let abilities = data.abilities
                
                
                const pokemon = {  name,  id, sprites, stats,  abilities };
                
               
                this.pokemonsData.splice((1-i),1,pokemon) 
                
            }
            
            console.log(this.pokemonsData)
          }
    }
}