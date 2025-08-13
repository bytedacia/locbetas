import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L, { type LeafletMouseEvent, type Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapSectionFoodProps {
  onCountrySelect: (countryName: string) => void;
  selectedCountry: string | null;
  correctCountry: string | null;
  wrongCountries: string[];
  correctGuess: string | null;
}

const WorldMap: React.FC<MapSectionFoodProps> = ({
  onCountrySelect,
  selectedCountry,
  correctCountry,
  wrongCountries,
  correctGuess,
}) => {
  const [geoData, setGeoData] = useState<any>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const highlightStyle = {
    weight: 2,
    color: "#ff7800",
    fillColor: "#f03",
    fillOpacity: 0.6,
  };

  const normalStyle = {
    weight: 1,
    color: "black",
    fillOpacity: 0.2,
    fillColor: "gray",
  };

  const correctStyle = {
    weight: 3,
    color: "#28a745",
    fillColor: "#28a745",
    fillOpacity: 0.8,
  };

  const wrongStyle = {
    weight: 2,
    color: "#dc3545",
    fillColor: "#dc3545",
    fillOpacity: 0.6,
  };

  const getCountryStyle = (countryName: string) => {
    // Se è la risposta corretta, colora di verde
    if (correctCountry && countryName.toLowerCase() === correctCountry.toLowerCase()) {
      return correctStyle;
    }
    
    // Se è stata indovinata correttamente, colora di verde
    if (correctGuess && countryName.toLowerCase() === correctGuess.toLowerCase()) {
      return correctStyle;
    }
    
    // Se è stata sbagliata, colora di rosso
    if (wrongCountries.some(wrong => wrong.toLowerCase() === countryName.toLowerCase())) {
      return wrongStyle;
    }
    
    // Se è selezionata attualmente, usa lo stile di highlight
    if (selectedCountry && countryName.toLowerCase() === selectedCountry.toLowerCase()) {
      return highlightStyle;
    }
    
    // Stile normale
    return normalStyle;
  };

  const onEachCountry = (feature: any, layer: Layer) => {
    const countryName = feature.properties.name;

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        const target = e.target as L.Path;
        // Non cambiare stile se il paese è già colorato (corretto o sbagliato)
        if (!correctCountry && !wrongCountries.some(wrong => wrong.toLowerCase() === countryName.toLowerCase())) {
          target.setStyle(highlightStyle);
          target.bringToFront();
        }
      },
      mouseout: (e: LeafletMouseEvent) => {
        const target = e.target as L.Path;
        // Ripristina lo stile appropriato
        const appropriateStyle = getCountryStyle(countryName);
        target.setStyle(appropriateStyle);
      },
      click: () => {
        // Permetti il click solo se il paese non è già stato colorato
        if (!correctCountry && !wrongCountries.some(wrong => wrong.toLowerCase() === countryName.toLowerCase())) {
          onCountrySelect(countryName);
        }
      },
    });

    // Initial style
    (layer as L.Path).setStyle(getCountryStyle(countryName));
  };

  // Load GeoJSON data once
  useEffect(() => {
    fetch("/data/countries.geo.json")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
      })
      .catch((err) => console.error("Error loading GeoJSON:", err));
  }, []);

  // Update styles when selection or results change
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer: L.Layer) => {
        const countryName = (layer as any).feature?.properties?.name;
        if (!countryName) return;

        (layer as L.Path).setStyle(getCountryStyle(countryName));
      });
    }
  }, [selectedCountry, correctCountry, wrongCountries, correctGuess]);

  return (
    <div className="map-section">
      {selectedCountry && (
        <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Selezionato: {selectedCountry}
        </p>
      )}

      {/* Legenda colori */}
      {(correctCountry || wrongCountries.length > 0) && (
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-color correct"></div>
            <span>Paese Corretto</span>
          </div>
          <div className="legend-item">
            <div className="legend-color wrong"></div>
            <span>Paesi Sbagliati</span>
          </div>
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        maxZoom={18}
        minZoom={2}
        scrollWheelZoom
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap
        />

        {geoData && (
          <GeoJSON
            key={`${selectedCountry}-${correctCountry}-${wrongCountries.join(',')}`} // force re-render on changes
            ref={(ref) => {
              if (ref) geoJsonRef.current = ref;
            }}
            data={geoData}
            onEachFeature={onEachCountry}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
