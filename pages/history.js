import { useAtom } from "jotai";
import {searchHistoryAtom} from '@/store';
import { useRouter } from "next/router";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '@/styles/History.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {removeFromHistory} from '@/lib/userData';


export default function History(){

    const router = useRouter();
    
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    if(!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked = async (e, index) => {

        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
                        
    }
    return (
        <>  
            {
            parsedHistory.length > 0?  
                (<ListGroup>
                    {parsedHistory.map((h, index) => (
                        <>
                            <ListGroup.Item className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
                                <span>{Object.keys(h).map(key => (<>{key}: <strong>{h[key]}</strong>&nbsp;</>))}</span>
                                <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                            </ListGroup.Item>
                        </>
                    ))}
                </ListGroup>) : (
                
                <Card>
                    <h4>Nothing Here</h4>
                    Try searching for some artwork.
                </Card>)
            }           
        </>
      );
    

}