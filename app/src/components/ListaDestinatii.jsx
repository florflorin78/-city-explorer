import DestinatieCard from './DestinatieCard.jsx';

export default function ListaDestinatii({ destinatii, onToggle }) {
  if (destinatii.length === 0) {
    return <p className="info">Nu există nicio destinație.</p>;
  }

  return (
    <div className="lista">
      {destinatii.map((destinatie) => (
        <DestinatieCard
          key={destinatie.id}
          destinatie={destinatie}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}