import React, { useState, useEffect } from 'react';
import './EarthquakeListItem.css';
import { EarthquakeListItemProps } from '../interfaces/EarthquakeListItemProps'; 
import { Comment } from '../interfaces/Comment';

const EarthquakeListItem: React.FC<EarthquakeListItemProps> = ({ earthquake }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Definir URL de la API basada en el entorno
  const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

  // Cargar comentarios existentes al montar el componente
  useEffect(() => {
    const fetchComments = async () => {
      const url = `${apiUrl}/${earthquake.id}/comments`;
      const response = await fetch(url);
      const data = await response.json();
      setComments(data); // Suponiendo que la respuesta es un arreglo de objetos con una propiedad 'body'
    };
    
    fetchComments();
  }, [earthquake.id, apiUrl]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    const url = `${apiUrl}/${earthquake.id}/comments`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: { body: comment } }), // Asegúrate de que el objeto enviado coincide con la estructura esperada en Rails
    });
  
    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]); // Asume que la respuesta incluye el comentario completo
      setShowForm(false);
      setComment('');
    } else {
      const error = await response.json();
      alert(`Error: ${error.message || 'No se puede agregar comentario'}`);
    }
  };

  const deleteComment = async (commentId: number) => {
    const url = `${apiUrl}/${earthquake.id}/comments/${commentId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (response.ok) {
      setComments(comments.filter(comment => comment.id !== commentId));
    } else {
      alert('Error al intentar eliminar el comentario');
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  const magnitude = typeof earthquake.magnitude === 'number' ? earthquake.magnitude : parseFloat(earthquake.magnitude);

  return (
    <div className="earthquake-list-item">
      <div className="earthquake-details">
        <div className="earthquake-magnitude">{magnitude.toFixed(1)}</div>
        <div className="earthquake-place">{earthquake.place}</div>
        <div className="earthquake-time">{new Date(earthquake.time).toLocaleString()}</div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {comment.body}
            <button onClick={() => deleteComment(comment.id)}>-</button>
          </div>
        ))}
      </div>
      <button onClick={toggleForm} className="add-comment-button">+</button>
      {showForm && (
        <div className="comment-form">
          <textarea value={comment} onChange={handleCommentChange} placeholder="Insert your comment here" />
          <div className="button-container">
            <button onClick={submitComment}>Save</button>
            <button onClick={toggleForm}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthquakeListItem;
