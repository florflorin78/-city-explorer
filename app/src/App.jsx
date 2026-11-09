import { useEffect, useState } from 'react'
import { getDestinatii, patchVizitat, postDestinatie } from './api/destinatii.js'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import Rezumat from './components/Rezumat.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Cautare from './components/Cautare.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  // 1b, 5c: 
  useEffect(() => {
    async function incarca() {
      try {
        const rezultat = await getDestinatii(pagina)
        setDestinatii(rezultat.data)
        setTotalPagini(rezultat.pages)
      } catch (err) {
        setEroare(err.message)
      } finally {
        setIncarcare(false)
      }
    }

    incarca()
  }, [pagina])

  // 1c: 
  async function handleToggle(id) {
    const curenta = destinatii.find((d) => d.id === id)

    try {
      const salvata = await patchVizitat(id, !curenta.vizitat)
      setDestinatii((curent) => curent.map((d) => (d.id === id ? salvata : d)))
    } catch (err) {
      setEroare(err.message)
    }
  }

  // 2: 
  async function handleAdd(destinatie) {
    setSeTrimite(true)

    try {
      const salvata = await postDestinatie(destinatie)
      setDestinatii((curent) => [...curent, salvata])
      return salvata
    } catch (err) {
      setEroare(err.message)
      return null
    } finally {
      setSeTrimite(false)
    }
  }

  if (incarcare) {
    return (
      <main>
        <h1>City Explorer</h1>
        <p className="stare">Se încarcă destinațiile...</p>
      </main>
    )
  }

  if (eroare) {
    return (
      <main>
        <h1>City Explorer</h1>
        <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>
      </main>
    )
  }

  const nevizitate = getNevizitate(destinatii)

  // 3b: 
  const text = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(text) ||
      d.tara.toLowerCase().includes(text),
  )

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={cautare} onChange={setCautare} />

      {/* 3c: */}
      {destinatii.length === 0 && (
        <p className="gol">Nu există nicio destinație. Adaugă prima din formular.</p>
      )}
      {destinatii.length > 0 && afisate.length === 0 && (
        <p className="gol">Niciun rezultat pentru „{cautare.trim()}”.</p>
      )}
      {afisate.length > 0 && (
        <ListaDestinatii destinatii={afisate} onToggle={handleToggle} />
      )}

      {/* 5c: */}
      <div className="paginare">
        <button
          type="button"
          onClick={() => setPagina((p) => p - 1)}
          disabled={pagina === 1}
        >
          Înapoi
        </button>
        <span>pagina {pagina} din {totalPagini}</span>
        <button
          type="button"
          onClick={() => setPagina((p) => p + 1)}
          disabled={pagina === totalPagini}
        >
          Înainte
        </button>
      </div>
    </main>
  )
}
