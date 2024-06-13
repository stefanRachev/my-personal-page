export const fetchComments = async (imageId) => {
    const response = await fetch(`/comments/${imageId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return response.json();
  };
  
  export const addComment = async (commentData) => {
    const token = sessionStorage.getItem('authToken'); // или localStorage
    const response = await fetch(`/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Изпращаме токена в заглавието
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error('Failed to add comment');
    }
    return response.json();
  };
  