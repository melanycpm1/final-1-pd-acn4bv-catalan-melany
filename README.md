# Wikison

Aplicación web desarrollada con **React** y **Node.js** que permite visualizar y gestionar información sobre personajes, temporadas, lugares, película y creadores del universo de **Los Simpson**.

El proyecto implementa un **CRUD completo** sobre la entidad **Personajes**, consumiendo una API propia desarrollada en **Express** y conectada a base de datos.

---

## Tecnologías utilizadas

### Frontend
- React
- React Router DOM
- Bootstrap 5
- Fetch API

### Backend
- Node.js
- Express
- Base de datos  
  (colecciones: personajes, temporadas, lugares, pelicula, creadores)

---

## Funcionalidades principales

### Personajes (CRUD completo)

- Listar personajes
- Buscar personaje por nombre
- Ver detalle individual
- Agregar nuevo personaje (POST)
- Editar personaje desde la vista detalle (PUT)
- Eliminar personaje con confirmación (DELETE)

### Otras secciones

- Temporadas (listado y búsqueda)
- Lugares
- Película
- Creadores

---

## Conceptos aplicados

- useState
- useEffect
- useParams
- useNavigate
- Componentes reutilizables
- Props y elevación de funciones
- Renderizado condicional
- Peticiones HTTP (GET, POST, PUT, DELETE)
- Manejo de estado dinámico
- Confirmación antes de eliminar
- Filtrado en tiempo real

---

## Funcionamiento del CRUD

### Crear personaje
- Se envía una petición **POST** al backend.
- Se actualiza el estado sin recargar la página.

### Leer personajes
- Se realiza una petición **GET** al iniciar la aplicación.
- Los datos se almacenan en el estado global.

### Actualizar personaje
- Desde la vista de detalle se activa el modo edición.
- Se envía una petición **PUT** al backend.
- El estado se actualiza dinámicamente sin recarga.

### Eliminar personaje
- Se solicita confirmación mediante `window.confirm()`.
- Se envía una petición **DELETE** al backend.
- El estado se actualiza utilizando `filter()` para remover el personaje eliminado.
