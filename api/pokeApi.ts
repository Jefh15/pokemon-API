import axios from "axios";


const pokeApi = axios.create({
    // base del url del cual quiero que cargue
    baseURL: 'https://pokeapi.co/api/v2'
})



// metodo get
// pokeApi.get('/pokemon?limit=151')


export default pokeApi;