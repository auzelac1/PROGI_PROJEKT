import { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import ShipCard from '../components/ShipCard';
import Ucitavanje from '../components/Ucitavanje';
import PublicHeader from '../components/PublicHeader';
import SearchBar from '../components/SearchBar';
import { useStyles } from '../useStyles';
import indexCss from '../styles/index.css?url';
import { getFleet } from '../services/fleetServices';
import DodatniFilteri from '../components/DodatniFilteri';

export default function PlovilaPage() {
    useStyles(indexCss);

    const [searchParams] = useSearchParams();
    const { key: locationKey } = useLocation();
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        getFleet(searchParams)
            .then((data) => {
                setShips(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [searchParams]);

    useEffect(() => {
        if (loading) return;
        const filters = document.getElementById('dodatni-filtri');
        filters.style.scrollMarginTop = `${document.querySelector('.pregled-header')?.offsetHeight || 0}px`;
        filters.scrollIntoView({ behavior: 'smooth' });
    }, [loading, locationKey]);

    const minPrice = !loading && !error && ships.length > 0
        ? Math.min(...ships.map((ship) => Number(ship.basics.cijena_dan)))
        : null;
    const minCabins = !loading && !error && ships.length > 0
        ? Math.min(...ships.map((ship) => Number(ship.model.broj_kabina)))
        : null;

    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    let days = null;
    if (dateFrom && dateTo) {
        const diff = (new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24);
        days = Math.round(diff) + 1;
    }

    return (
        <main className="pregled">
            <PublicHeader />

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Katalog plovila</h1>
                    <Link to="/" className="btn btn-outline-secondary">
                        &lt; Natrag na početnu
                    </Link>
                </div>

                <div className="mb-4">
                    <SearchBar />
                </div>

                <DodatniFilteri minPrice={minPrice} minCabins={minCabins} />

                {error && <p className="text-danger">Plovila se trenutno ne mogu učitati. Pokušajte ponovno kasnije.</p>}
                {loading && <Ucitavanje />}

                {!loading && !error && ships.length === 0 && (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                        <h3>Nema plovila koja odgovaraju traženim kriterijima</h3>
                        <p className="text-muted">Pokušajte promijeniti filtre ili očistiti pretragu.</p>
                    </div>
                )}

                {!loading && !error && ships.length > 0 && (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {ships.map((ship) => (
                            <div className="col" key={ship.basics.id_brod}>
                                 <ShipCard ship={ship} days={days} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}