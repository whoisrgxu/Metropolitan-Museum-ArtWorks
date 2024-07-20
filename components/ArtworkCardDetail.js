import Error from 'next/error';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import { useAtom } from 'jotai';
import {favouritesAtom} from '@/store'; 
import Button from 'react-bootstrap/Button';


export default function ArtworkCardDetail({objectID}) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState(()=>favouritesList.includes(objectID));

    function favouritesClicked() {

        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav != objectID));
            setShowAdded(false);
        }
        else {
            setFavouritesList(current => [...current, objectID]);
            setShowAdded(true);
        }
    }

    const {data, error} = useSWR(objectID? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    if (error) return <Error statusCode={404}/>;
    else if (!data) return null;
    else {
        console.log(data);

        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card style={{ width: '100%'}}> 
                            <Card.Img variant="top" 
                                    src={data.primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} 
                                    alt={data.title || 'N/A'}
                                    style={{ width: '100%', maxHeight: '50vh', objectFit: 'contain' }}/>

                            <Card.Body style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                <Card.Title><strong>{data.title}</strong></Card.Title>
                                <Card.Text>
                                    <strong>Date:</strong> {data.objectDate || 'N/A'}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Classification:</strong> {data.classification || 'N/A'}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Medium:</strong> {data.medium || 'N/A'}
                                </Card.Text>

                                <Card.Text>
                                    <strong>Artist:</strong> {data.artistDisplayName || 'N/A'} {data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>}                      
                                </Card.Text> 
                                <Card.Text>
                                    <strong>Credit:</strong> {data.creditLine || 'N/A'}                       
                                </Card.Text>                    
                                <Card.Text>
                                    <strong>Dimensions:</strong> {data.dimensions || 'N/A'}                       
                                </Card.Text>
                                <Button variant={showAdded? "primary" : "outline-primary"} onClick={favouritesClicked} >+ Favourite {showAdded &&  "(added)"}</Button>
                            </Card.Body>
                        </Card>
                </Col>
                </Row>
            </Container>
        )
    }
}