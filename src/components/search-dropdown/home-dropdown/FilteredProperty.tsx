import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Property {
  _id: string;
  title: string;
  description: string;
  category: string;
  listedIn: string;
  price: number;
  size: string;
  bedrooms: number;
  bathrooms: number;
  kitchens: number;
  yearBuilt: string;
  floors: number;
  amenities: string[];
  address: string;
  city: string;
  ownerContactNumber: string;
  images: string[];
}

const FilteredProperty: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const location = useLocation();
  const criteria = location.state || {};

  console.log(criteria);
  

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        const allProperties: Property[] = response.data.properties || [];
        const filteredProperties = allProperties.filter(property => {
          const matchesCategory = criteria.category ? property.category.toLowerCase() === criteria.category.toLowerCase() : true;
          const matchesLocation = criteria.location ? property.city.toLowerCase() === criteria.location.toLowerCase() : true;
          const matchesPriceRange = criteria.priceRange ? property.price <= parseInt(criteria.priceRange) : true;
          return matchesCategory && matchesLocation && matchesPriceRange;
        });
        setProperties(filteredProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [criteria]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Filtered Properties</h1>
      <div className="row">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0">
                <img
                  src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/300'}
                  className="card-img-top"
                  alt={property.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text text-muted">{property.description}</p>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{property.price}
                  </p>
                  <p>
                    <strong>Location:</strong> {property.city || 'N/A'}
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setSelectedContact(property.ownerContactNumber)}
                  >
                    Show Contact
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found matching the criteria.</p>
        )}
      </div>

      {selectedContact && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Owner Contact</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedContact(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-center fs-5">📞 {selectedContact}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedContact(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredProperty;
