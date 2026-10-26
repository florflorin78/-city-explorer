import { useState } from 'react';
import { destinatii as destinatiiInitiale } from './data/destinatii.js';
import { getNevizitate, totalZile, marcheazaVizitat, adaugaDestinatie } from './utils/destinatii.js';
import Rezumat from './components/Rezumat.jsx';
import FormularDestinatie from './components/FormularDestinatie.jsx';
import ListaDestinatii from './components/ListaDestinatii.jsx';
import './App.css';

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale);

  const handleToggle = (id) => {
    setDestinatii((curent) => marcheazaVizitat(curent, id));
  };

  const handleAdd = (nouaDestinatie) => {
    setDestinatii((curent) => adaugaDestinatie(curent, nouaDestinatie));
  };

  const nevizitate = getNevizitate(destinatii); 
  const total = destinatii.length;
  const numarNevizitate = nevizitate.length;
  const numarZile = totalZile(nevizitate);

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat total={total} nevizitate={numarNevizitate} zile={numarZile} />
      <FormularDestinatie onAdd={handleAdd} />
      <ListaDestinatii destinatii={destinatii} onToggle={handleToggle} />
    </main>
  );
}