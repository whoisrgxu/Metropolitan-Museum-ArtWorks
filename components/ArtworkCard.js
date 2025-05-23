import Error from 'next/error';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

export default function ArtworkCard({objectID}) {

    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) return <Error statusCode={404}/>;
    if (!data) return null;
    console.log(data);
    
    return (
        <Card style={{ width: '18rem', height: '100%' }}>
            <Card.Img style={{ width: '100%', height: '200px', objectFit: 'cover' }} variant="top" src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} alt={data.title || 'N/A'} />
            <Card.Body className="d-flex flex-column bg-light">
                <div style={{ flexGrow: 1 }}>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                        <strong>Date:</strong> {data.objectDate || 'N/A'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Classification:</strong> {data.classification || 'N/A'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Medium:</strong> {data.medium || 'N/A'}
                    </Card.Text>
                </div>
                <Link href={`/artwork/${objectID}`} passHref>                                    
                    <Button variant="success" className="mt-3">Detail (ID: {objectID})</Button>
                </Link>
                
            </Card.Body>
        </Card>
    )
}