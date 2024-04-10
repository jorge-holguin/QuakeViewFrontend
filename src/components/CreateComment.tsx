// // src/components/CreateComment.js

// import React, { useState } from 'react';

// function CreateComment({ featureId }) {
//   const [comment, setComment] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Reemplaza la URL por la URL de tu API y asegúrate de que la ruta y los parámetros sean correctos.
//     fetch(`http://127.0.0.1:3001/api/features/${featureId}/comments`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ body: comment })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       // Aquí podrías manejar la respuesta, como limpiar el formulario o mostrar un mensaje de éxito.
//       setComment(''); // Limpiar el formulario
//     })
//     .catch(error => console.error('Error:', error));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="comment">Comentario:</label>
//       <textarea
//         id="comment"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         required
//       ></textarea>
//       <button type="submit">Enviar Comentario</button>
//     </form>
//   );
// }

// export default CreateComment;
