import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import './AddProperty.css';

interface PropertyFormData {
    title: string;
    description: string;
    category: string;
    listedIn: string;
    price: number | '';
    size: string;
    bedrooms: number | '';
    bathrooms: number | '';
    kitchens: number | '';
    yearBuilt: string;
    floors: number | '';
    address: string;
    location: { lat: number; lng: number };
    amenities: string[];
    images: string[];
    city: string;
    ownerContactNumber: string; // Add owner contact number field
}

const AddProperty: React.FC = () => {
    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        description: '',
        category: '',
        listedIn: '',
        price: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        kitchens: '',
        yearBuilt: '',
        floors: '',
        address: '',
        location: { lat: 12.9716, lng: 77.5946 }, // Default location (Bangalore, India)
        amenities: [],
        images: [],
        city: '',
        ownerContactNumber: '', // Initialize owner contact number field
    });

    const [loading, setLoading] = useState(false);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);

    const categories = ['Apartment', 'House', 'Villa'];
    const listings = ['Rent', 'Sale'];
    const amenitiesList = ['Pool', 'Gym', 'Garage', 'Garden'];
    const cities = ['Bangalore', 'Chennai', 'Coimbatore', 'Kochi', 'Hyderabad', 'Trivandrum']; // Predefined cities

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (amenity: string) => {
        setFormData((prevState) => {
            const { amenities } = prevState;
            if (amenities.includes(amenity)) {
                return { ...prevState, amenities: amenities.filter((item) => item !== amenity) };
            } else {
                return { ...prevState, amenities: [...amenities, amenity] };
            }
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const s3 = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: 'AKIA4MI2KAJ2F6TUZL7A',
                secretAccessKey: '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',
            },
        });

        const uploadedImageUrls: string[] = [];
        setLoading(true);

        for (const file of files) {
            const params = {
                Bucket: 'homy-bucket',
                Key: `properties/${Date.now()}-${file.name}`,
                Body: file,
                ContentType: file.type,
            };

            try {
                const command = new PutObjectCommand(params);
                await s3.send(command);
                const url = `https://homy-bucket.s3.eu-north-1.amazonaws.com/${params.Key}`;
                uploadedImageUrls.push(url);
                console.log('Uploaded image URL:', url);
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image.');
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...uploadedImageUrls],
        }));

        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = { ...formData, userId: localStorage.getItem('userId') };

        try {
            const response = await axios.post('http://localhost:5000/api/properties', formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                alert('Property added successfully');
                console.log('Property added:', response.data);
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error: any) {
            console.error('Error submitting property:', error);
            alert('Failed to submit property.');
        }
    };

    useEffect(() => {
        if (mapRef.current && !map) {
            const googleMap = new window.google.maps.Map(mapRef.current, {
                center: { lat: 12.9716, lng: 77.5946 }, // Default location (Bangalore, India)
                zoom: 12,
            });

            setMap(googleMap);

            googleMap.addListener('click', (event: google.maps.MapMouseEvent) => {
                if (event.latLng) {
                    const lat = event.latLng.lat();
                    const lng = event.latLng.lng();

                    setFormData((prevState) => ({
                        ...prevState,
                        location: { lat, lng },
                    }));

                    if (marker) {
                        marker.setMap(null);
                    }

                    const newMarker = new google.maps.Marker({
                        position: { lat, lng },
                        map: googleMap,
                        title: 'Selected Location',
                    });

                    setMarker(newMarker);

                    // Log the selected location details to the console
                    console.log('Selected Location:', { lat, lng });
                }
            });
        }
    }, [map, marker]);

    return (
        <form onSubmit={handleSubmit} className="add-property-form">
            <h1 className="form-title">Add Property</h1>

            <div className="form-section">
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-section">
                <label>Listed In</label>
                <select name="listedIn" value={formData.listedIn} onChange={handleChange}>
                    <option value="">Select Listing Type</option>
                    {listings.map((list) => (
                        <option key={list} value={list}>
                            {list}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-section">
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Size (m²)</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Bedrooms</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Bathrooms</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Kitchens</label>
                <input type="number" name="kitchens" value={formData.kitchens} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Year Built</label>
                <input type="text" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Floors</label>
                <input type="number" name="floors" value={formData.floors} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="form-section">
                <label>Location</label>
                <div ref={mapRef} style={{ width: '100%', height: '300px', marginTop: '10px' }}></div>
            </div>

            <div className="form-section">
                <label>City</label>
                <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-section">
                <label>Owner Contact Number</label>
                <input
                    type="text"
                    name="ownerContactNumber"
                    value={formData.ownerContactNumber}
                    onChange={handleChange}
                />
            </div>

            <div className="form-section">
                <label>Amenities</label>
                <div className="checkbox-group">
                    {amenitiesList.map((amenity) => (
                        <label key={amenity}>
                            <input
                                type="checkbox"
                                checked={formData.amenities.includes(amenity)}
                                onChange={() => handleCheckboxChange(amenity)}
                            />
                            {amenity}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-section">
                <label>Images</label>
                <input type="file" multiple onChange={handleImageUpload} />
                {loading && <p>Uploading images, please wait...</p>}
                <div className="image-preview">
                    {formData.images.map((url, index) => (
                        <img key={index} src={url} alt="Property" className="image-thumbnail" />
                    ))}
                </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
                Submit
            </button>
        </form>
    );
};

export default AddProperty;