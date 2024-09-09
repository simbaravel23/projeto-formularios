// src/Formulario.js
import React, { useState } from 'react';

const Formulario = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    marca: '',
    corda: '',
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
    if (!formData.marca) errors.marca = 'Marca é obrigatória';
    if (!formData.corda) errors.corda = 'Corda é obrigatória';
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
        marca: '',
        corda: '',
        mensagem: '',
      });
      setErrors({});
    }
  };

  return (
    <div>
      <h2>Formulário de Exemplo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
          />
          {errors.marca && <p className="error">{errors.marca}</p>}
        </div>
        <div>
          <label htmlFor="corda">Corda:</label>
          <input
            type="text"
            id="corda"
            name="corda"
            value={formData.corda}
            onChange={handleChange}
          />
          {errors.corda && <p className="error">{errors.corda}</p>}
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