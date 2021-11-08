import React,{ useEffect, useState } from "react";
import { apiCall } from "../service/dataService";
import { isNullOrUndefined } from "../utils/utils";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { CircularProgress } from '@material-ui/core';

export default function Characters({urls, onClose}){

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if(isNullOrUndefined(urls))
      return;

    async function fetchData() {
      setLoading(true);
      
      setPeople([]);
      for(let i = 0; i< urls.length; i++) {
        const data = await apiCall(urls[i]);
  
        const result = data.name;
        setPeople(prevPeople => [
          ...prevPeople, result
        ]);
      }
      
      // let sorted = people.sort((a,b)=> a - b);

      // setPeople(sorted);
      setPeople(prevPeople => (
        prevPeople.sort()
      ));

      setLoading(false);
    }

    fetchData();
  }, [urls]);

  const handleClose = (event) => {
    onClose(event);
  };

  return(
    <div>
    {
      loading ?
      <CircularProgress />
      :
      <List>
      {
        people.map((person, index) => 
        <ListItem
        key={index}>
            {person}
          </ListItem>
          )
      }  
      </List>
    }
    
  <Button 
  variant='contained'
  onClick={handleClose}>Close</Button>
</div>
  );
}