import React from 'react';
import NiceSelect from "../../../ui/NiceSelect";
import { useNavigate } from 'react-router-dom';

const DropdownOne = ({ style }: any) => {
  const navigate = useNavigate();

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const criteria = {
      category: formData.get('category') || "", // Remove default value
      location: formData.get('location') || "", // Remove default value
      priceRange: formData.get('priceRange') || "", // Remove default value
    };
    // navigate('/filtered-properties', { state: criteria });
    navigate('/listing_01')
  };

  const handleSelectChange = (value: string, name: string) => {
    console.log(`Selected ${name}:`, value);
    // Handle changes specific to the dropdowns if needed
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="row gx-0 align-items-center">
        {/* <div className="col-xl-3 col-lg-4">
          <div className="input-box-one border-left">
            <div className="label">I’m looking to...</div>
            <NiceSelect
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={[
                { value: "Renthouse", text: "Rent Houses" },
                { value: "sellhouse", text: "Sell Houses" },
                { value: "pgmen", text: "Looking For PG Men's" },
                { value: "pgwomen", text: "Looking For PG Women's" },
                { value: "pgcoliving", text: "Looking For PG Co-Living" },
                { value: "buyapartments", text: "Buy Apartments" },
              ]}
              defaultCurrent={0}
              name="category"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleSelectChange(event.target.value, 'category')
              }
              placeholder=""
            />
          </div>
        </div> */}
        {/* <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
          <div className="input-box-one border-left">
            <div className="label">Location</div>
            <NiceSelect
              className={`nice-select location ${style ? "fw-normal" : ""}`}
              options={[
                { value: "bangalore", text: "Bangalore, India" },
                { value: "chennai", text: "Chennai, India" },
                { value: "coimbatore", text: "Coimbatore, India" },
                { value: "hyderabad", text: "Hyderabad, India" },
                { value: "kochi", text: "Kochi, India" },
                { value: "trivandrum", text: "Trivandrum, India" },
              ]}
              defaultCurrent={0}
              name="location"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleSelectChange(event.target.value, 'location')
              }
              placeholder=""
            />
          </div>
        </div> */}
        {/* <div className="col-xl-3 col-lg-4">
          <div className="input-box-one border-left border-lg-0">
            <div className="label">Price Range</div>
            <NiceSelect
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={[
                { value: "1", text: "₹3,000 - ₹5,000" },
                { value: "2", text: "₹5,000 - ₹8,000" },
                { value: "3", text: "₹8,000 - ₹10,000" },
                { value: "4", text: "₹10,000 - ₹15,000" },
                { value: "5", text: "₹15,000 - ₹20,000" },
                { value: "6", text: "₹20,000 - ₹30,000" },
                { value: "7", text: "₹30,000 - ₹50,000" },
              ]}
              defaultCurrent={0}
              name="priceRange"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleSelectChange(event.target.value, 'priceRange')
              }
              placeholder=""
            />
          </div>
        </div> */}
        <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
          <div className="input-box-one lg-mt-10">
            <button
              className={`fw-500 tran3s ${
                style
                  ? "w-100 tran3s search-btn-three"
                  : "text-uppercase search-btn"
              }`}
            >
              {style ? "Search Now" : "Explore Our Listings"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DropdownOne;