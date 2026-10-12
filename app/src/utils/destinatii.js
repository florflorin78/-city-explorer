// Ex 1 
export const getOrase = (list) => list.map(d => d.oras);

export const getNevizitate = (list) => list.filter(d => !d.vizitat);

export const totalZile = (list) => list.reduce((sum, d) => sum + d.zile, 0);

export const formatDestinatie = ({ oras, tara, zile, vizitat }) => `[${vizitat ? 'x' : ' '}] ${oras}, ${tara} (${zile} zile)`;

export const numarPeTara = (list) => list.reduce((acc, d) => ({ ...acc, [d.tara]: (acc[d.tara] ?? 0) + 1 }), {});

export const sortDupaZile = (list) => [...list].sort((a, b) => b.zile - a.zile);

// Ex 2
export const marcheazaVizitat = (list, id) => 
  list.map((d) => d.id === id ? { ...d, vizitat: !d.vizitat } : d);

export const adaugaDestinatie = (list, d) => [...list, d];

export const stergeDestinatie = (list, id) => list.filter((d) => d.id !== id);