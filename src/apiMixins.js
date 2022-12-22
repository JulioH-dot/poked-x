

//import axios from'axios'



export default{
    data:()=>({
        pokemonsData: [],
        poke:{}
    }),
    methods:{
        /*
        buscaPokemons: function(){
            axios.get('http://pokeapi.co/api/v2/pokemon?limit=150')
            .then(res =>{
                
                console.log(res.data.results);
                this.pokemons = res.data.results;
            })
            .catch(function(err){
                console.log(err);
            })
        }*/

        
        get(){

            for(let i =1; i<150; i++){
            
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(res => res.json())
                    .then(data=>{
                        const { name, id, stats, abilities } = data
                
                        const sprites = data.sprites.front_default;
                        const type = data.types[0].type.name
                
                        let pokemons= {name, id, sprites, stats, abilities, type}
                        this.poke = pokemons 
                        this.pokemonsData.push(this.poke)
                    })
            /*
                const { name, id, stats, abilities } = data
                
                let sprites = response.sprites.front_default;
                
                
                let pokemons= {name, id, sprites, stats, abilities}
                
                
                this.poke =  pokemons
               
                console.log(poke)*/
            }
            
            
        },
        /*watch:{

            poke(newValue){
                this.pokemonsData.push(newValue)
                console.log(this.pokemonsData)
              },
        }*/
        
    }
}