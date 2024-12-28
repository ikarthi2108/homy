import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingOneArea: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data.properties || []);
        setFilteredProperties(response.data.properties || []);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((property) => {
      const matchesCategory = categoryFilter ? property.category === categoryFilter : true;
      const matchesLocation = locationFilter ? property.city.toLowerCase() === locationFilter.toLowerCase() : true;
      const matchesPrice = property.price >= priceRange.min && property.price <= priceRange.max;
      return matchesCategory && matchesLocation && matchesPrice;
    });
    setFilteredProperties(filtered);
  }, [categoryFilter, locationFilter, priceRange, properties]);

  // Image Carousel Component
  const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      console.log('Previous Index:', currentIndex); // Debugging
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      console.log('Next Index:', currentIndex); // Debugging
    };

    // Debugging: Log the current image URL
    useEffect(() => {
      console.log('Current Image:', images[currentIndex]);
    }, [currentIndex, images]);

    return (
      <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '10px' }}>
        {/* Placeholder Image */}
        {isLoading && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            <div>Loading...</div>
          </div>
        )}

        {/* Actual Image */}
        <img
          key={currentIndex} // Force re-render when currentIndex changes
          src={images[currentIndex]}
          alt={`Property ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block',
          }}
          onLoad={() => setIsLoading(false)}
        />

        {/* Navigation Buttons (Only show if there are multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
              }}
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
              }}
            >
              &gt;
            </button>
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '14px',
              }}
            >
              {`${currentIndex + 1}/${images.length}`}
            </div>
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: '#1d201d',
          color: '#fbfbfb',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px',
          marginTop: '100px',
          borderRadius: '10px',
        }}
      >
        <h1 style={{ margin: 0, color: '#fff' }}>Property Listings</h1>
      </div>

      {/* Filter Options */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            cursor: 'pointer',
            flex: '1',
          }}
        >
          <option value="">All Categories</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          {/* Add other categories as needed */}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            cursor: 'pointer',
            flex: '1',
          }}
        >
          <option value="">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kochi">Kochi</option>
          <option value="Trivandrum">Trivandrum</option>
          {/* Add other locations as needed */}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            flex: '1',
          }}
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || Infinity })}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            flex: '1',
          }}
        />
      </div>

      {/* Property Listings */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {/* Image Carousel */}
              {property.images && property.images.length > 0 && (
                <ImageCarousel images={property.images} />
              )}

              {/* Property Details */}
              <h2 style={{ marginTop: '20px', color: '#333' }}>{property.title}</h2>
              <p style={{ color: '#666' }}>{property.description}</p>
              <p>
                <strong>Category:</strong> {property.category}
              </p>
              <p>
                <strong>Price:</strong> {property.price}
              </p>
              <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </p>
              <p>
                <strong>City:</strong> {property.city}
              </p>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              margin: '20px 0',
            }}
          >
            <h3 style={{ color: '#6c757d', margin: 0 }}>No properties found in the given criteria.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingOneArea;