/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Rong Gang Xu Student ID: 129160230 Date: 2024-07-05
*
********************************************************************************/ 

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


export default function Home () {

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="The Metropolitan Museum of Art" fluid rounded />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <p>
            The Metropolitan Museum of Art, colloquially referred to as the Met, is an encyclopedic art museum in New York City. It is the largest art museum in the Americas and the fourth-largest in the world. With 5.36 million visitors in 2023, it is the most-visited museum in the United States and the fourth-most visited art museum in the world.<br/>
            As of 2000, its permanent collection had over two million works; it currently lists a total of 1.5 million objects. The collection is divided into 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia - The Metropolitan Museum of Art</a>
        </Col>
      </Row>
    </Container>
  );
}