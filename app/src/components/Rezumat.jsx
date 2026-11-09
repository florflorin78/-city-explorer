import { nr } from '../utils/destinatii.js'

export default function Rezumat({ total, nevizitate, zile }) {
  return (
    <p className="rezumat">
      {nr(total, 'destinații')}, {nevizitate} nevizitate, {nr(zile, 'zile')} de vizitat
    </p>
  )
}
