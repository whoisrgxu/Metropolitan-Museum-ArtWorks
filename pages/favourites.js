import {useAtom} from 'jotai';
import {favouritesAtom} from '@/store'; 
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';



export default function Favourites () {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    return (
        <>
            <Row className="gy-4">
                {favouritesList.length > 0? (favouritesList.map((currentObjectID) => (
                    <Col xs={12} md={6} lg={4} xxl={3} key={currentObjectID} className="d-flex justify-content-center"><ArtworkCard objectID={currentObjectID} /></Col>))
                ) : (
                    <Card>
                    <h4>Nothing Here</h4>
                    Try adding some new artwork to the list.
                </Card>
                )
                }
            </Row>         
        </>
    );

}