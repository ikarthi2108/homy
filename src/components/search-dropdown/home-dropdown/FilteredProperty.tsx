import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
  images: string[];
}

const FilteredProperty: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const location = useLocation();
  const criteria = location.state;

  console.log("criteria", criteria);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        const allProperties: Property[] = response.data.properties || [];

        if (!criteria) {
          console.warn('No criteria provided. Displaying all properties.');
          setProperties(allProperties); // If no criteria, show all properties
          return;
        }

        const filteredProperties = allProperties.filter((property: Property) => {
          const category = property.category || '';
          const locationCity = property.city || '';
          const price = property.price || 0;

          console.log("location from API", locationCity);

          // Primary filter: Location must match
          const matchesLocation =
            !criteria?.location ||
            locationCity.toLowerCase() === criteria.location.toLowerCase();

            console.log("hi",matchesLocation);
            

          // Secondary filters: Category and Price Range (only applied if provided)
          const matchesCategory =
            !criteria?.category ||
            category.toLowerCase() === criteria.category.toLowerCase();

          const matchesPriceRange = !criteria?.priceRange || (() => {
            const priceRange = parseInt(criteria.priceRange, 10);
            const ranges: [number, number][] = [
              [3000, 5000],
              [5000, 8000],
              [8000, 10000],
              [10000, 15000],
              [15000, 20000],
              [20000, 30000],
              [30000, 50000],
            ];

            if (isNaN(priceRange) || priceRange < 1 || priceRange > ranges.length) {
              console.warn(`Invalid priceRange: ${criteria.priceRange}`);
              return false;
            }

            const [min, max] = ranges[priceRange - 1];
            return price >= min && price <= max;
          })();

          // Match location first, then apply secondary filters if provided
          return matchesLocation && (!criteria.category || matchesCategory) && (!criteria.priceRange || matchesPriceRange);
        });

        setProperties(filteredProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [criteria]);

  return (
    <div className="container">
      <h1>Filtered Properties</h1>
      <div className="row">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="col-md-4 mb-4">
              <div className="card">
                {/* Ensure there is at least one image */}
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[0]}
                    className="card-img-top"
                    alt={property.title}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt="No Image Available"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">{property.description}</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price: ₹{property.price}</li>
                    <li className="list-group-item">Size: {property.size} sqft</li>
                    <li className="list-group-item">Bedrooms: {property.bedrooms}</li>
                    <li className="list-group-item">Bathrooms: {property.bathrooms}</li>
                    <li className="list-group-item">Kitchens: {property.kitchens}</li>
                    <li className="list-group-item">Year Built: {property.yearBuilt}</li>
                    <li className="list-group-item">Floors: {property.floors}</li>
                    <li className="list-group-item">Amenities: {property.amenities.join(', ')}</li>
                    <li className="list-group-item">Address: {property.address}</li>
                    <li className="list-group-item">Location: {property.city || 'N/A'}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredProperty;