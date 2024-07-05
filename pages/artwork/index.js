import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';


export default function Artwork () {

    const PER_PAGE = 12;

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);
    
    useEffect(()=> {
      if (data) {
        const results = [];
        for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
          const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
          results.push(chunk);
          setArtworkList(results);
        }
      }
      setPage(1);
    }, [data]);
    
    function previousPage() {
      if (page > 1) setPage((prevPage => prevPage - 1));
    }
    
    function nextPage() {
      if (page < artworkList.length) {
        setPage((prevPage => prevPage + 1));
      }
    }    
  
    if (error) {
        return <Error statusCode={404}/>
    }
    if (!artworkList) return null;

    return (
        <>
            <Row className="gy-4">
                {artworkList.length > 0? (artworkList[page - 1].map((currentObjectID) => (
                    <Col xs={12} md={6} lg={4} xxl={3} key={currentObjectID} className="d-flex justify-content-center"><ArtworkCard objectID={currentObjectID} /></Col>))
                ) : (
                    <Card>
                    <h4>Nothing Here</h4>
                    Try searching for something else.
                </Card>
                )
                }
            </Row>
            <Pagination className="mt-3 justify-content-center">
                <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
            </Pagination>            
        </>
    );

}