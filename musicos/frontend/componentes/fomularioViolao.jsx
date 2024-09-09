// src/Formulario.js
import React, { useState } from 'react';

const Formulario = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  // Estado para armazenar mensagens de erro
  const [errors, setErrors] = useState({});

  // Manipulador de mudanças dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validação do formulário
  const validate = () => {
    const errors = {};
    if (!formData.nome) errors.nome = 'nome é obrigatória';
    if (!formData.email) errors.email = 'email é obrigatória';
    if (!formData.mensagem) errors.mensagem = 'Mensagem é obrigatória';
    return errors;
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Aqui você pode enviar os dados para a API ou fazer algo com eles
      console.log('Dados do formulário:', formData);
      // Limpar o formulário após o envio
      setFormData({
          nome: '',
          email: '',
          mensagem: ''
      });
      setErrors({});
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {errors.nome && <p className="error">{errors.nome}</p>}
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
          />
          {errors.mensagem && <p className="error">{errors.mensagem}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;