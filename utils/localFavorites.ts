

const toggleFavorite = (id: number) => {
  
    // console.log('toggleFavorite Llamado');
    
    // grabar en el localStorage
    // Si no existe lo inserto, si existe lo borro
    

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]');

    if (favorites.includes(id)) {
        // hago un filtro excluya ese id
        favorites = favorites.filter( pokeId => pokeId !== id);
    } else {
        // si no lo incluye
        // lo inserto el id del pokemon insertado
        favorites.push(id);
    }

    // lo guardo en el localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites) );

}


// funcion para verificar si existe o no el pokemon en locaStorage
const existInFavorites = (id: number): boolean => {
    

    // para que no reviente mi aplicacion con este error
    // Server Error
    // ReferenceError: localStorage is not defined
    // This error happened while generating the page. Any console logs will be displayed in the terminal window.

    if (typeof window === 'undefined') {
        // ei esta verificando del lado del servidor voy a retornar un false
        return false;
    }


    // todo mi arreglo de pokemones en localStorage
    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]');

    // para ver si incluye o no
    return favorites.includes(id);


}



// funcion que me regrea un arreglo de numeros
const pokemons = (): number[] => {

    // pregunto si estabmos en lado del servidor o no

    return JSON.parse( localStorage.getItem('favorites') || '[]');



}



export default {

    toggleFavorite,
    existInFavorites,
    pokemons
}