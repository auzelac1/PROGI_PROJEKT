import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCategories, getPorts } from '../services/fleetServices';

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [dateFrom, setDateFrom] = useState(searchParams.get('date_from') || '');
    const [dateTo, setDateTo] = useState(searchParams.get('date_to') || '');
    const [numOfPeople, setNumOfPeople] = useState(searchParams.get('num_of_people') || '');
    const [port, setPort] = useState(searchParams.get('port') || '');

    const [categories, setCategories] = useState([]);
    const [ports, setPorts] = useState([]);

    useEffect(() => {
        Promise.all([getCategories(), getPorts()])
            .then(([catRes, portRes]) => {
                setCategories(catRes);
                setPorts(portRes);
            })
            .catch(() => { });
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (dateFrom) params.append('date_from', dateFrom);
        if (dateTo) params.append('date_to', dateTo);
        if (numOfPeople) params.append('num_of_people', numOfPeople);
        if (port) params.append('port', port);

        navigate(`/plovila?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 rounded-4 shadow-lg" style={{ maxWidth: '1600px' }}>
            <form onSubmit={handleSearch}>
                <div className="row g-3 align-items-end">
                    <div className="col-md">
                        <label className="form-label small text-muted fw-bold text-start d-block mb-1">Kategorija</label>
                        <div className="input-group border rounded-3 p-1 bg-light">
                            <span className="input-group-text bg-transparent border-0 text-muted ps-2">⛵</span>
                            <select
                                className="form-select border-0 bg-transparent shadow-none px-1"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Sve kategorije</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md">
                        <label className="form-label small text-muted fw-bold text-start d-block mb-1">Datum od</label>
                        <div className="input-group border rounded-3 p-1 bg-light">
                            <span className="input-group-text bg-transparent border-0 text-muted ps-2">📅</span>
                            <input
                                type="date"
                                className="form-control border-0 bg-transparent shadow-none px-1"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md">
                        <label className="form-label small text-muted fw-bold text-start d-block mb-1">Datum do</label>
                        <div className="input-group border rounded-3 p-1 bg-light">
                            <span className="input-group-text bg-transparent border-0 text-muted ps-2">🌙</span>
                            <input
                                type="date"
                                className="form-control border-0 bg-transparent shadow-none px-1"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md">
                        <label className="form-label small text-muted fw-bold text-start d-block mb-1">Gosti</label>
                        <div className="input-group border rounded-3 p-1 bg-light">
                            <span className="input-group-text bg-transparent border-0 text-muted ps-2">👥</span>
                            <input
                                type="number"
                                min="1"
                                className="form-control border-0 bg-transparent shadow-none px-1"
                                placeholder="8 osoba"
                                value={numOfPeople}
                                onChange={(e) => setNumOfPeople(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md">
                        <label className="form-label small text-muted fw-bold text-start d-block mb-1">Luka</label>
                        <div className="input-group border rounded-3 p-1 bg-light">
                            <span className="input-group-text bg-transparent border-0 text-muted ps-2">⚓</span>
                            <select
                                className="form-select border-0 bg-transparent shadow-none px-1"
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                            >
                                <option value="">Sve luke</option>
                                {ports.map((p) => (
                                    <option key={p.id_luka} value={p.id_luka}>{p.ime_luka}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-auto">
                        <button
                            type="submit"
                            className="btn pregled-btn w-100 py-2 px-4 d-flex align-items-center justify-content-center"
                            style={{ height: '48px', fontSize: '1.05rem' }}
                        >
                            Pretraži
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}