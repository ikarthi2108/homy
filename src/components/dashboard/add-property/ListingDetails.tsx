import React, { ChangeEvent } from "react";
import NumberNiceSelect from "../../../ui/NumberNiceSelect";

// Define types for the props
interface ListingDetailsProps {
   handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
   handleSelectChange: (name: string, value: string) => void;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ handleInputChange, handleSelectChange }) => {

   const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      handleSelectChange(name, value);
   };

   return (
      <div className="bg-white card-box border-20 mt-40">
         <h4 className="dash-title-three">Listing Details</h4>
         <div className="row align-items-end">
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="size">Size in ft*</label>
                  <input 
                     type="text" 
                     placeholder="Ex: 3,210 sqft" 
                     name="size"
                     onChange={handleInputChange} 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="bedrooms">Bedrooms*</label>
                  <NumberNiceSelect 
                     className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="bedrooms"
                     placeholder="Select Bedrooms" 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="bathrooms">Bathrooms*</label>
                  <NumberNiceSelect 
                     className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="bathrooms"
                     placeholder="Select Bathrooms" 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="kitchens">Kitchens*</label>
                  <NumberNiceSelect 
                     className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="kitchens"
                     placeholder="Select Kitchens" 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="yearBuilt">Year Built*</label>
                  <input 
                     type="text" 
                     placeholder="Type Year" 
                     name="yearBuilt"
                     onChange={handleInputChange} 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="floors">Floors No*</label>
                  <NumberNiceSelect 
                     className="nice-select"
                     options={[
                        { value: 1, text: 0 },
                        { value: 2, text: 1 },
                        { value: 3, text: 2 },
                        { value: 4, text: 3 },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="floors"
                     placeholder="Select Floors" 
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ListingDetails;
