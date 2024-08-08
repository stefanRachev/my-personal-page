import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const host = "http://localhost:3001";

const EmailForm = () => {
  
  const { user, loading } = useAuth();
 
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  
  if (loading) {
    return <p>Loading...</p>;
  }

  
  if (!user) {
    return <Navigate to="/users/login" />;
  }



  // Функция за обработка на изпращането на формата
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name, // Използване на името на потребителя от контекста
        email: user.email, // Използване на имейла на потребителя от контекста
        subject,
        message,
      }),
    });

    // Успешно или неуспешно изпращане на имейла
    if (response.ok) {
      alert("Email sent successfully!");
      setSubject("");
      setMessage("");
    } else {
      alert("Failed to send email.");
    }
  };

  // Връщане на JSX компонента за формата
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={user.name} disabled />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={user.email} disabled />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
