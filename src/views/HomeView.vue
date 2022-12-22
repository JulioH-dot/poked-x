<template>
  <div class="container">
    <div class="row mt-2">
      
      <!-- início lado esquerdo -->
      <div class="col mb-2">
        <div class="card palco">
          <div class="card-header"></div>

          <div class="card-body bg-pokebola bg-normal">
            <div class="pokemon">
              <transition 
                
                enter-active-class="animate__animated animate__lightSpeedInLeft" 
                leave-active-class="animate__animated animate__lightSpeedOutRight"
              >
                <img :src="require(`@/assets/imgs/pokemons/${pokemon.imagem}`)" v-if="exibir"/>
              </transition> 
              <div class="evolucoes">
                <transition name="fade" v-for="evolucao in pokemon.evolucoes" :key="evolucao">
                  <img :src="require(`@/assets/imgs/pokemons/${evolucao.toString().padStart(3, '0')}.png`)" v-if="exibirEvolucoes"/>
                </transition> 
                
              </div>
            </div>
          </div>

          <div class="card-footer">
            <nav class="nav nav-pills nav-fill">
              <router-link class="nav-item nav-link text-white" :to="{name: 'sobre'}" exact-active-class="active">Sobre</router-link>
              <router-link class="nav-item nav-link text-white" :to="{name: 'habilidades'}" exact-active-class="active">Habilidades</router-link>
              <router-link class="nav-item nav-link text-white" :to="{name: 'status'}" exact-active-class="active">Status</router-link>

            <!-- menu de navegação -->
            </nav>

          <div class="detalhes">  
            <!-- exibe dados de acordo com o menu de navegação -->
            <router-view v-slot="{ Component }" 
              :pokemon="pokemon"
              @adicionarHabilidade="addHabilit"
              @removerHabilidade="removeHabilidade"
            >
              <transition enter-active-class="animate__animated animate__bounceInUp">
                <component :is="Component" />
              </transition>
            </router-view> 
          </div>

          </div>
        </div>
      </div>
      <!-- fim lado esquerdo -->

      <!-- início lado direito -->
      <div class="col mb-2 pokedex">        
        <div class="row">
          <div class="col">
            <h1>Pokédex</h1>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <select class="form-select" v-model="ordem">
              <option value="" disabled>Ordene</option>
              <option value="1">Id crescente</option>
              <option value="2">Id decrescrente</option>
              <option value="3">De A - Z</option>
              <option value="4">De Z - A</option>
            </select>
          </div>
        
          <div class="col">
            <input type="text" 
              class="form-control" 
              placeholder="Pesquisar pokémon"
              v-model="pesquisa" @keyup.enter="pesquisarNome()"
              >
          </div>
        </div>

        <div class="row">
          <div class="pokedex-catalogo">

            <!-- início listagem dinâmica -->
            <transition-group name="ordenacao">
              <div v-for="p in pokemons" :key="p.id" 
                :class="`cartao-pokemon bg-${p.tipo}`" 
                @click="analisarPokemon(p)">
  
                <h1>{{ p.id }} {{ p.nome }}</h1>
                <span>{{ p.tipo }}</span>
                <div class="cartao-pokemon-img">
                  <transition
                    enter-active-class="animate__animated animate__fadeInDown"
                    appear
                  >
                    <img :src="require(`@/assets/imgs/pokemons/${p.imagem}`)" >
                  </transition>
                </div>
              </div>
            </transition-group>

            <!-- fim listagem dinâmica -->
            
          </div>
          
        </div>
      </div>
      <!-- fim lado direito -->
      
    </div>
  </div>
</template>

<script>

import apiMixins from '@/apiMixins.js'

export default {
  name: 'HomeView',
  mixins: [apiMixins],
  data: ()=>({
    exibir: false,
    exibirEvolucoes: false,
    ordem:'',
    pokemon: {},
    pokemons: [],
    pesquisa:''
  }),
  watch:{
    
    ordem(newValue){

      if(newValue == 1){
        this.pokemons.sort((proximo, atual)=>{
          if(atual.id < proximo.id){
            return 1
          } else if(atual.id > proximo.id){
            return -1
          } 
          return 0
        })
      }

      if(newValue == 2){
        this.pokemons.sort((proximo, atual)=>{
          if(atual.id < proximo.id){
            return -1
          } else if(atual.id > proximo.id){
            return 1
          } 
          return 0
        })
      }

      if(newValue == 3){
        this.pokemons.sort((proximo, atual)=>{
          let result = proximo.nome.localeCompare(atual.nome)
          return result
        })
      }
      if(newValue == 4 ){
        this.pokemons.sort((proximo, atual)=>{
          let result = atual.nome.localeCompare(proximo.nome)
          


          return result 
        })
      }
    }
  },
  methods:{
    pesquisarNome(){
      fetch(`http://localhost:3000/pokemons?nome_like=${this.pesquisa}`)
      .then(response => {
        return response.json()
      })
      .then(data=>{
        this.pokemons = data
      })
    },

    addHabilit(habilidade){
      if(this.pokemon.habilidades){
      
        this.pokemon.habilidades.push(habilidade)
      
      }
    },

    removeHabilidade(index){
      if(this.pokemon.habilidades[index]){

        this.pokemon.habilidades.splice(index, 1)

      }
    },
    
    analisarPokemon(p){

      let pokemonAnalisado = false

      if((this.pokemon.id != p.id)&& this.exibir == true){

        setTimeout(()=>{
          this.analisarPokemon(p)
        },1000)

        pokemonAnalisado = true
      }

      this.exibir = !this.exibir
      this.pokemon = p
      this.exibirEvolucoes = !this.exibirEvolucoes


      if(!this.exibir && !pokemonAnalisado){
        this.pokemon = {}
      }
    }
  },
  created(){
    fetch('http://localhost:3000/pokemons')
      .then(response => {
        return response.json()
      })
      .then(data=>{
        this.pokemons = data
      })

      //this.get()
      
      
  }
}
</script>

<style>
body {
  background-color: #dee3eb;
}
</style>

<style scoped>
@import '~@/assets/css/animations.css';
.pokedex {
  padding: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

.pokedex-catalogo {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 98%;
  margin-top: 10px;
}

.cartao-pokemon {
  position: relative;
  margin: 5px;
  width: 150px;
  height: 115px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.cartao-pokemon h1{
  color:#fff;
  font-size: 14px;
  margin: 5px 0px 0px 5px;
  padding: 0px;
}

.cartao-pokemon span{
  color:#fff;
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 10px 0px 0px 5px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

.cartao-pokemon img {
    max-width:60%;
    max-height:60%;
}

.bg-grama {
  background-color: #2d8f78;
}

.bg-fogo {
  background-color: #e47373
}

.bg-agua {
  background-color: #5a9ed2
}

.bg-inseto {
  background-color: #26d3ab
}

.bg-normal {
  background-color: #cecece
}

.bg-pokebola {
  background-image: url('@/assets/imgs/pokebola.png');
  background-repeat: no-repeat;
  background-position: bottom right;
}

.palco {
  color: #fff;
  background-color: #333;
  -webkit-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  border-radius: 10px;
}

.pokemon {
  display: block;
  text-align: center;
  height: 215px;
}

.detalhes {
  margin: 20px 30px 20px 30px;
}

.evolucoes{
  position: absolute;
  top: 0px;
  right: 0px;
  height: 70px;
  margin: 5px 0px;
}

.evolucoes img{
  cursor: pointer;
  max-height: 100%;
  max-width: 100%;
  float: right;
}

</style>
