// Produce db-mare.json, cu doua mii de destinatii.
import { writeFileSync } from 'node:fs'

const tari = {
  Portugalia: ['Lisabona', 'Porto', 'Faro', 'Braga', 'Coimbra'],
  România: ['Cluj-Napoca', 'Brașov', 'Sibiu', 'Iași', 'Timișoara'],
  Japonia: ['Kyoto', 'Tokyo', 'Osaka', 'Nara', 'Kobe'],
  Spania: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Bilbao'],
  Italia: ['Roma', 'Milano', 'Florența', 'Napoli', 'Veneția'],
}

const destinatii = []
const perechi = Object.entries(tari).flatMap(
  ([tara, orase]) => orase.map((oras) => ({ oras, tara })),
)

for (let i = 1; i <= 2000; i++) {
  const { oras, tara } = perechi[i % perechi.length]
  destinatii.push({
    id: String(i),
    oras: `${oras} ${i}`,
    tara,
    zile: (i % 14) + 1,
    vizitat: i % 3 === 0,
  })
}

writeFileSync('db-mare.json', JSON.stringify({ destinatii }, null, 2))
console.log(`db-mare.json scris, ${destinatii.length} destinații`)
