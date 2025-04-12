# Practica-Fetch
Se realizo una práctica con el metodo fetch.
### Explicacion del metodo fetch 
*El método fetch se utiliza para realizar peticiones a servidores y obtener recursos de forma remota. Estas peticiones pueden ser de diferentes tipos (GET, POST, PUT, DELETE, etc.), y fetch devuelve una promesa que se resuelve con el response (respuesta) de esa solicitud.*

***En esta practica, fetch recibe una URL como argumento. En este caso, la URL es 'https://fakestoreapi.com/products/'
Cuando la promesa responde por fetch se resuelve, entra.then()
es un objeto Response. El método .json() convierte esa respuesta (generalmente en formato JSON) en un objeto JavaScript
La respuesta de la solicitud fetch es un objeto Response. Al llamar a .json() sobre este objeto, estamos indicando que el contenido de la respuesta está en formato JSON.
Después de obtener los datos en formato JSON, el siguiente paso es pasar esos datos (en la variable res) a la función createCards, que probablemente generará una representación visual de los productos, como las tarjetas que se ven en la interfaz.***

![https://]