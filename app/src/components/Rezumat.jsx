export default function Rezumat({ total, nevizitate, zile }) {
  return (
    <p className="rezumat">
      {total} destinatii, {nevizitate} nevizitate, {zile} zile de vizitat
    </p>
  );
}