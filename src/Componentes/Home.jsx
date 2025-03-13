import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Container, Navbar, Table, Button, Modal, Form } from "react-bootstrap";
import { ObtenerClientes, AgregarClientes, ActualizarClientes, EliminarClientes } from "../Redux/Api";
import useWebSocket from "../Hooks/useWebSocket";

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [clienteList, setClienteList] = useState([]);

    const { clientes ,ClienteListar } = useWebSocket();
  


    useEffect(() => {
        const fetchClientes = async () => {
          try {
            const data = await ObtenerClientes();
            
            if (JSON.stringify(data) !== JSON.stringify(clienteList)) {
              console.log("Actualizando lista de clientes...");
              setClienteList(data);
            }
          } catch (error) {
            console.error("Error obteniendo clientes:", error);
          }
        };
      
        fetchClientes();
      }, [clientes]);

    const handleShowModal = (cliente) => {
        setShowModal(true);
        setSelectedCliente(cliente || {});
        setIsEditMode(!!cliente);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCliente(null);
        setIsEditMode(false);
    };

    const handleAgregar = async () => {
        try {
            const nuevoCliente = await AgregarClientes(selectedCliente);
            setClienteList((prevClientes) => [...prevClientes, nuevoCliente]);

            setShowModal(false);
            await ClienteListar(selectedCliente);
            Swal.fire({
                icon: "success",
                title: "Cliente agregado correctamente",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al agregar el Cliente",
                text: error.message,
            });
        }
    };

    const handleUpdate = async () => {
        try {
            const clienteParaActualizar = {
                ...selectedCliente, 
                nombre: selectedCliente.nombre,
                email: selectedCliente.email,
            };
            const actualizadoCliente = await ActualizarClientes(selectedCliente.id, clienteParaActualizar);

            setClienteList((prevClientes) =>
                prevClientes.map((cliente) =>
                    cliente.id === actualizadoCliente.id ? actualizadoCliente : cliente
                )
            );

            await ClienteListar(clienteParaActualizar);
            setShowModal(false);

            Swal.fire({
                icon: "success",
                title: "Cliente actualizado correctamente",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al actualizar el Cliente",
                text: error.message,
            });
        }
    };

    const handleEliminar = async (cliente) => {
        try {
            await EliminarClientes(cliente.id);
            setClienteList((prevClientes) =>
                prevClientes.filter((cli) => cli.id !== cliente.id)
            );

            Swal.fire({
                icon: "success",
                title: "Cliente eliminado correctamente",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al eliminar el Cliente",
                text: error.message,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedCliente((prevCliente) => ({
            ...prevCliente,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar expand="lg" bg="primary" variant="dark" fixed="top">
                <Container>
                    <Button className="btn-success mb-3"href="/" > Cerrar Sesion</Button>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                </Container>
            </Navbar>
            <Container style={{ marginTop: "80px" }}>
                <h1>Lista de Clientes</h1>
                <Button className="btn-success mb-3" onClick={() => handleShowModal()}>
                    Agregar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th colSpan={2}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clienteList.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <Button className="btn-primary" onClick={() => handleShowModal(cliente)}>
                                        Editar
                                    </Button>
                                </td>
                                <td>
                                    <Button className="btn-danger" onClick={() => handleEliminar(cliente)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCliente && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={selectedCliente.nombre || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={selectedCliente.email || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={isEditMode ? handleUpdate: handleAgregar}>
                        {isEditMode ? "Guardar cambios" : "Agregar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;
