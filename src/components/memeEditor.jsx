import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Draggable from "react-draggable";
import "../styles/memeEditor.css";
import { getMemes } from "../../src/services/getMemes";
import { Container, Row, Col, Form } from "react-bootstrap";

const MemeEditor = () => {
  const [memeList, setMemeList] = useState([]);
  const [image, setImage] = useState("");
  const [inputText, setInputText] = useState({ topText: "", bottomText: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMemes();
        setMemeList(response);
        setImage(response[0].url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImage = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    html2canvas(document.querySelector(".meme"), {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
    }).then((canvas) => {
      let img = canvas.toDataURL("image/jpg");
      let elem = document.createElement("a");
      elem.download = "meme.jpg";
      elem.href = img;
      elem.click();
      elem.remove();
    });
  };

  return (
    <>
      <div className="too-small">
        <h1>Esto es un bug porque no es responsive.</h1>
        <h1>Ampliar a más de 1200px</h1>
      </div>
      <Container fluid>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <h2>Elegite un meme</h2>
              <Form.Select onChange={onChangeImage}>
                {memeList.map((meme) => (
                  <option key={meme.id} value={meme.url}>
                    {meme.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Label>
                <h2>Agregá el texto superior</h2>
              </Form.Label>
              <input
                className="form-control"
                type="text"
                name="topText"
                placeholder="Texto 1"
                value={inputText.topText}
                onChange={handleInputChange}
              />
              <Form.Label>
                <h2>Agregá el texto inferior</h2>
              </Form.Label>
              <input
                className="form-control"
                type="text"
                name="bottomText"
                placeholder="Texto 2"
                value={inputText.bottomText}
                onChange={handleInputChange}
              />
              <button type="submit">
                <h2> Descargá tu meme</h2>
              </button>
            </Form>
          </Col>
          <Col>
            <div className="meme">
              <img src={image} alt="Meme" />
              <Draggable>
                <h2 className="top">{inputText.topText}</h2>
              </Draggable>
              <Draggable>
                <h2 className="bottom">{inputText.bottomText}</h2>
              </Draggable>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MemeEditor;
