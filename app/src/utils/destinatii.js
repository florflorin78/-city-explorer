export const getNevizitate = (list) => list.filter((d) => !d.vizitat)

export const totalZile = (list) => list.reduce((total, d) => total + d.zile, 0)

export const marcheazaVizitat = (list, id) =>
  list.map((d) => (d.id === id ? { ...d, vizitat: !d.vizitat } : d))

export const adaugaDestinatie = (list, destinatie) => [...list, destinatie]

export const nr = (n, cuvant) =>
  (n % 100 >= 20 ? `${n} de ${cuvant}` : `${n} ${cuvant}`)
