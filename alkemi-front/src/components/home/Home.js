import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import {
  Form,
  Table,
  Button,
  Container,
  Modal,
  Input,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import './home.css'

const Home = () => {
  const [db, setDb] = useState([]);
  const [modalIncertar, setModalincertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [dale, setDale] = useState(true);
  const [data, setForm] = useState({
    Concepto: "",
    Monto: "",
    Fecha: "",
    Tipo: "",
  });
 
  let total = 0;
  db.map((ele) => {
    if (ele.Tipo === "Salida") {
      return total += -Math.abs(ele.Monto)
    } else {
      return total += ele.Monto
    }
  });

  const checkIfEmpty = () => {
    if (db > 0) {
      console.log("yes");
      setIsEmpty(true);
    } else {
      console.log("va");
      setIsEmpty(false);
    }
  };

  useEffect(
    (db) => {
      axios
        .get("http://localhost:7000/abm/10")
        .then((res) => {
          setDb(res.data);
        })
        // .then(checkIfEmpty)
        .catch((error) => alert(error));
      setTimeout(() => {
        if (db < 0) {
          console.log("yes");
          setIsEmpty(true);
        } else {
          // console.log(db.length);

          console.log("va");
          setIsEmpty(false);
        }
      }, 1000);
    },
    [modalIncertar, modalEditar, update, isEmpty, dale]
  );

  const handleIncert = () => {
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:7000/abm/add",
      data: data,
    })
      .then((res) => {
        console.log(res);
      })
      .then(setForm({
        Concepto: "",
        Monto: "",
        Fecha: "",
        Tipo: "",
      }))
      .then(setModalincertar(false))
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    console.log(id);
    axios({
      method: "delete",
      url: `http://localhost:7000/abm/delete/${id}`,
    })
      .then((res) => {
        setUpdate(true);
        console.log(res);
      })
      .then(setUpdate(false))
      .catch((error) => alert(error));
  };
  const handleUpdate = (id) => {
    axios({
      method: "put",
      url: `http://localhost:7000/abm/update/${id}`,
      data: data,
    })
      .then((res) => {
      })
      .then(setModalEditar(false))
      .then(setForm({
        Concepto: "",
        Monto: "",
        Fecha: "",
        Tipo: "",
      }))
      .catch((error) => alert(error));
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setForm({
      ...data,
      [name]: value,
    });
  };

  const mostrarModalIncertar = () => {
    setModalincertar(true);
  };

  const ocultarModalIncertar = () => {
    setModalincertar(false);
  };

  const mostrarModalEditar = (data) => {
    setModalEditar(true);
    setForm(data);
  };

  const ocultarModalEditar = () => {
    setModalEditar(false);
  };

  const cleanForm = () => {
    setForm({
      Concepto: "",
      Monto: "",
      Fecha: "",
      Tipo: "",
    })
  }

  return (
    <>
      <Container className='container'>
        <div className="button_container col">
          <Button
            color="success"
            onClick={mostrarModalIncertar}
            className="incertar"
          >
            New transaction
          </Button>
          <div className="total">Balance: {total} $</div>
        </div>
        <Form>
          <Table>
            <thead>
              <tr>
                <th>Cocepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dale ? (
                db.map((data) => (
                  <tr key={data.Id}>
                    <td>{data.Concepto}</td>
                    <td>{data.Monto + "$"}</td>
                    <td>{moment(data.Fecha).format("YYYY-MM-DD")}</td>
                    <td>{data.Tipo}</td>
                    <td>
                      <Button
                        color="primary"
                        onClick={(e) => mostrarModalEditar(data)}
                        className='button'
                      >
                        Edit
                      </Button>
                      {"  "}
                      <Button
                        color="danger"
                        onClick={(e) => handleDelete(data.Id)}
                        className='button'
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Form>
      </Container>
      <Modal isOpen={modalIncertar}>
        <ModalHeader>
          <div>
            <h3>Incertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              type="text"
              className="form-control"
              value={data.Id}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label>Concepto:</label>
            <input
              type="text"
              className="form-control"
              name="Concepto"
              value={data.Concepto}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Monto:</label>
            <input
              type="text"
              className="form-control"
              value={data.Monto}
              name="Monto"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha:</label>
            <input
              type="text"
              className="form-control"
              value={data.Fecha}
              name="Fecha"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Tipo:</label>
            <Input
              type="select"
              className="form-control"
              value={data.Tipo}
              name="Tipo"
              onChange={handleChange}
            >
              <option name="Tipo" value="" hidden></option>
              <option name="Tipo" value="Entrada">
                Entrada
              </option>
              <option name="Tipo" value="Salida">
                Salida
              </option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleIncert}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => {ocultarModalIncertar() ; cleanForm();}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              type="text"
              className="form-control"
              value={data.Id}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <label>Concepto:</label>
            <input
              type="text"
              className="form-control"
              name="Concepto"
              value={data.Concepto}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Monto:</label>
            <input
              type="text"
              className="form-control"
              value={data.Monto}
              name="Monto"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha:</label>
            <input
              type="text"
              className="form-control"
              value={moment(data.Fecha).format("YYYY-MM-DD")}
              name="Fecha"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Tipo:</label>
            <input
              type="text"
              className="form-control"
              value={data.Tipo}
              name="Tipo"
              readOnly
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleUpdate(data.Id)}>
            Editar
          </Button>
          <Button color="danger" onClick={() => {ocultarModalEditar() ; cleanForm();}}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Home;
