import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import {useAtom} from 'jotai';
import {favouritesAtom} from '@/store'; 
import {searchHistoryAtom} from '@/store';
import {getFavourites, getHistory} from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register' ,'/', '/_error'];

export default function RouteGuard(props) {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      }

    const [authorized, setAuthorized] = useState(false);

    const router = useRouter();

    useEffect(() => {
      // on initial load - run auth check
      updateAtoms().then(() => {
      authCheck(router.pathname);
  
      // on route change complete - run auth check
      router.events.on('routeChangeComplete', authCheck);
  
      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off('routeChangeComplete', authCheck);
      };})
    }, []);
  
    function authCheck(url) {
      const path = url.split('?')[0];
      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push('/login');
      }
      else setAuthorized(true);
    }
  
    return <>{authorized && props.children}</>
  }
  