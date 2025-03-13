import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {AuthLoguin,ValidationLoguin} from '../Redux/LoguinApi'
import Swal from 'sweetalert2';
function Login() {
  const [credenciales, setCredenciales] = useState({
    username: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales((prevCredenciales) => ({
      ...prevCredenciales,
      [name]: value,
    }));
  };
  console.log(credenciales)
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const data = await AuthLoguin(credenciales.username, credenciales.password);
      const token = data.token;
      console.log(token);
      localStorage.setItem("token", token);
      await ValidationLoguin(token);
      navigate('/home');
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        title: "Error!",
        text: "Credenciales incorrectas o no esta registrado",
        icon: "error"
      });
      navigate('/');
    }
  }
  return (
    <Form onSubmit={handleSubmit} className="p-4 rounded shadow bg-light" style={{ maxWidth: "400px", margin: "auto" }}>
      <h3 className="text-center mb-4">Iniciar Sesión</h3>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">Usuario</Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="username"
            placeholder="Ingrese su usuario"
            value={credenciales.username}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">Contraseña</Form.Label>
        <Col sm="9">
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={credenciales.password}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">Iniciar Sesión</Button>
    </Form>
  );
}

export default Login;