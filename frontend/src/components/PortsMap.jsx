import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { PORTS } from '../api/plovila';

export default function PortsMap({ ports, zoom = 7, link = true, height = 420 }) {
  const center = ports.length === 1 ? [ports[0].lat, ports[0].lng] : [44.2, 15.9];

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height }} className="ports-map">
      <TileLayer attribution="&copy; OpenStreetMap" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ports.map((p) => {
        const globalIndex = PORTS.findIndex(item => item.id === p.id) + 1;
        const customIcon = L.divIcon({
          className: 'custom-port-marker',
          html: `<div style="background-color: #0E3A5C; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; border: 2.5px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.35);">${globalIndex}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        return (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={customIcon}>
            <Popup>
              <strong>{globalIndex}. {p.naziv}</strong>
              {link && <div><Link to={`/plovila?luka=${p.id}`}>Plovila iz ove luke</Link></div>}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}