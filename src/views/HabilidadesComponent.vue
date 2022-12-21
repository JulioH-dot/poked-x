<template>
    <div>
        <div v-if="!pokemon.habilidades">
            <p>Selecione um pokemon</p>
        </div>
        <div v-else>
            <table class="table text-white" >
                <tbody>
                    <tr v-for="(habilidades, index) in pokemon.habilidades" :key="index">
                        <td>{{ habilidades }}</td>
                        <td class="d-flex justify-content-end">
                            <button type="button" 
                                class="btn btn-danger btn-sm"
                                @click="$emit('removerHabilidade', index)"
                            >   
                            x
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="text" 
                class="form-control" 
                placeholder="Adicionar habilidade"
                v-model="habilidade"
                @keyup.enter="adicionarHabilidade()"
            >
        </div>
    </div>
</template>

<script>

export default{
    name: 'HabilidadesComponent',
    props:{
        pokemon: Object
    },
    data:()=>({
        habilidade: '',
    }),
    methods:{
        adicionarHabilidade(){
            this.$emit('adicionarHabilidade', this.habilidade)

            this.habilidade =''
        },

        
    }       
}
</script>

<style scoped>
.table td {
    border: none;
}
</style>