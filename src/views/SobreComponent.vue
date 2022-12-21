<template>
    <div>
        <div v-if="!pokemon.id">
            <p>Selecione um pokemon</p>
        </div>
        <div v-else>
            <p>Identificador: {{ pokemon.id }}</p>
            <p>Nome: {{ pokemon.nome }}</p>
            <p>Tipo: {{ pokemon.tipo }}</p>
        </div>
    </div>
</template>

<script>

export default{
    name: 'SobreComponent',
    props:{
        pokemon: Object
    }
}
</script>