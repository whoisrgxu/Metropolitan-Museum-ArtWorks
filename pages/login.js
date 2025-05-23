import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import {searchHistoryAtom} from '@/store';
import {favouritesAtom} from '@/store'; 
import { getFavourites, getHistory } from "@/lib/userData";


export default function Login(props) {

  // State for input fields and warning message
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState('');

  // Access router for redirect
  const router = useRouter();

  // Access and update Jotai global atoms
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Function to update global state from server
  async function updateAtoms() {
    try {
      const favourites = await getFavourites();
      setFavouritesList(favourites);
      console.log("favourites updated:", favourites);

      const history = await getHistory();
      setSearchHistory(history);
      console.log("history updated:", history);
    } catch (error) {
      console.error("Error updating atoms:", error);
    }
  }

  // Form submission handler
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password); // Authenticate user
      await updateAtoms(); // Update atoms with user data
      console.log("atom updated");
      router.push('/favourites'); // Redirect on successful login
    } catch (err) {
      console.error("Error during login:", err);
      setWarning(err.message); // Show warning if login fails
    }
  }

  return (
    <>
      <br />

      {/* Show error alert if warning exists */}
      { warning && ( <><Alert variant="danger">{warning}</Alert></> )}

      {/* Login form */}
      <Form onSubmit={handleSubmit}>

        {/* Username input */}
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>

        <br />

        {/* Password input */}
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <br />

        {/* Submit button */}
        <Button variant="primary" className="pull-right" type="submit">Login</Button>

      </Form>
    </>
  );
}
