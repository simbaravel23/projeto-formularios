// src/Formulario.js
import React, { useState } from 'react';

const Formulario = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    instrumento: '',
    contato: '',
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
    if (!formData.nome) errors.nome = 'Nome é obrigatório';
    if (!formData.instrumento) errors.instrumento = 'Instrumento é obrigatória';
    if (!formData.contato) errors.contato = 'Contato é obrigatória';
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
        instrumento: '',
        contato: '',
      });
      setErrors({});
    }
  };

  return (
    <div>
      <h2>Cadastro músico</h2>
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
          <label htmlFor="instrumento">Instrumento:</label>
          <input
            type="text"
            id="instrumento"
            name="instrumento"
            value={formData.instrumento}
            onChange={handleChange}
          />
          {errors.instrumento && <p className="error">{errors.instrumento}</p>}
        </div>
        <div>
          <label htmlFor="contato">Contato:</label>
            <input
            type="number"
            id="Contato"
            name="Contato"
            value={formData.contato}
            onChange={handleChange}
          />
          {errors.contato && <p className="error">{errors.contato}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;