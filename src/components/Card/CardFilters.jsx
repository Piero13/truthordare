import { Form } from "react-bootstrap";
import { genreOptions, actesOptions } from "../../datas/playerOptions";

export default function CardFilters({ filters, onChange }) {
  return (
    <Form className="mb-4 d-flex flex-wrap gap-2">
      <Form.Select
        className="border border-2 border-primary"
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
      >
        <option value="all">Tous les types</option>
        <option value="action">Action</option>
        <option value="verite">Vérité</option>
      </Form.Select>

      <Form.Select
        className="border border-2 border-primary"
        value={filters.genre}
        onChange={(e) => onChange({ ...filters, genre: e.target.value })}
      >
        <option value="all">Tous genres</option>
        {genreOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Form.Select>

      <Form.Select
        className="border border-2 border-primary"
        value={filters.niveau}
        onChange={(e) => onChange({ ...filters, niveau: e.target.value })}
      >
        <option value="all">Tous niveaux</option>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>Niveau {n}</option>
        ))}
      </Form.Select>

      <Form.Select
        className="border border-2 border-primary"
        value={filters.acte}
        onChange={(e) => onChange({ ...filters, acte: e.target.value })}
      >
        <option value="all">Tous actes</option>
        {actesOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Form.Select>
    </Form>
  );
}
