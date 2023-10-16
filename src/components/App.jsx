import { useEffect, useState } from 'react';
import '../styles/App.scss';
//variables de estado

function App() {
  const [data, setData] = useState ([]);
  const [searchInput, setSearchInput] = useState ('');
  const [search, setSearch] = useState ('todos');
  const [newCountry, setNewCountry] = useState ({
    name: "",
    capital: "",
    flag: "",
    continents:""
  })
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,continents')
      .then((response) => response.json())
      .then((fetchData) => {
        setData(fetchData);
      });
  }, []);
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  }
 const handleSearchInput = (ev) =>{
  setSearchInput(ev.target.value);
 }
 const handleSearch = (ev) =>{
  setSearch(ev.target.value);
 }
 const handleNewCountry = (ev) => {
  setNewCountry({
    ...newCountry,
    [ev.target.name]: ev.target.value
  });
}
const handleClick = (ev) => {
  ev.preventDefault();
  setData([...data, newCountry]);
  setNewCountry({
    name: "",
    capital: "",
    flag: "",
    continents:""
  });
};

const renderList = () => {
  return data
    .filter(country => {
      if (search === 'todos') return true;
      return country.continents.includes(search);
    })
    .filter(country =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )
    .map((country, index) => (
      <li key={index}>
        <div>
          <span>{country.flag}</span>
          <h3>{country.name.common}</h3>
          <p>Capital: {country.capital[0]}</p>
          <p>Continents: {country.continents}</p>
        </div>
      </li>
    ));
}



  return (
    <div 
    className="App">
      <header className='header'>
          <h1 className='header__title'> PAISES</h1>
        <form onSubmit={handleOnSubmit}>
          <label className='label' htmlFor='searchCountry'>
            By Country:
          <input className='header__search'
          type= 'text'
          name= 'name'
          placeholder="Spain.."
          onChange ={handleSearchInput}
          value= {searchInput}
          >
          </input>
          </label>
          <label className='filter__text' htmlFor='searchContinent'>
            By Continents:
          </label>
          <select className='select' 
          name='character' 
          id='character' 
          onChange={handleSearch} 
          value={search}>
            <option value='Todos'>All </option>
            <option value='Africa'> Africa </option>
            <option value='North America'> North America </option>
            <option value='South America'> South America</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'> Europe </option>
            <option value='Oceania'> Oceania </option>
          </select>
          
        </form>
      </header>
      <main className='main'>
        <section className='containter'> 
          <ul className='list-country'>
            {renderList()}
          </ul>
        </section>
        <section className='container'>
         <form action="">
           <h2 className='title-newContry'>Add Country</h2>
           <label htmlFor=""> Country Name: 
             <input
                className="new-country"
                type="text"
                name="name"
                id="countryName"
                placeholder='Country Name'
                onChange={handleNewCountry}
                value={newCountry.name}
              />
           </label>
           <label htmlFor=""> Capital: 
 
             <input
                className="new-capital"
                type="text"
                name="capital"
                id="capital"
                placeholder="Capital"
                onChange={handleNewCountry}
                value={newCountry.capital}
              />
           </label>
           <label htmlFor=""> Flag: 
             <input
                className="new-flag"
                type="text"
                name="flag"
                id="flag"
                placeholder='flag'
                onChange={handleNewCountry}
                value={newCountry.flag}
              />
           </label>
           <label htmlFor=""> Continents: 
             <input
                className="new-continents"
                type="text"
                name="continents"
                id="continents"
                placeholder='continents'
                onChange={handleNewCountry}
                value={newCountry.continents}
              />
           </label>
           
            
           <input
                className="new-country"
                type="submit"
                value="Añadir"
                onClick={handleClick}
              />

          </form>
        </section>
      </main>
  </div>
  );
}
export default App;
