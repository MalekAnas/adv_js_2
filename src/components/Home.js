import React,{ useEffect, useState } from "react";
import { apiCall } from "../service/dataService";
import { isNullOrUndefined } from "../utils/utils";
import Characters from "./Characters";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function Home() {

  const [films, setFilms] = useState([]);
  const [selected, setSelected] = useState(-1);

  useEffect(()=> {
    async function fetchData() {
      const data = await apiCall('https://swapi.dev/api/films');
      
      if(isNullOrUndefined(data)) 
        return;
  
      let results = data.results.map(element => (
        {
          title: element.title,
          release_date: element.release_date,
          characters: element.characters
        }
      ));

      results.sort((a,b) => 
        new Date(b.release_date) - new Date(a.release_date)
        );
  
      setFilms(results);  
    }
    fetchData();
  }, []);

  const handleViewCharacters = (event, id) => {
    event.preventDefault();
    setSelected(id);
  };

  const handleCharactersClose = (event) => {
    event.preventDefault();
    setSelected(-1);
  };

  return (
    <Container maxWidth="sm">
      <div>Star Wars Films</div>
      {
        films.map((film, filmId) => 
        <div>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {film.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} 
            color="text.secondary" 
            gutterBottom>
            {film.release_date}
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button 
            variant='contained'
            onClick={(event)=>handleViewCharacters(event, filmId)}>
            View
          </Button>
        </CardActions>
      </Card>
          {
            selected === filmId && 
            <Characters 
            urls={film.characters.slice(0,10)}
            onClose={handleCharactersClose}
            />
          }
          </div>
      )}
    </Container>

    );
}