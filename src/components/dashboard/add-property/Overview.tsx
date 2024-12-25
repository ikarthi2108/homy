import React, { ChangeEvent } from "react";
import NiceSelect from "../../../ui/NiceSelect";

// Define types for the props
interface OverviewProps {
   handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   handleSelectChange: (name: string, value: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ handleInputChange, handleSelectChange }) => {

   const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      handleSelectChange(name, value);
   };

   return (
      <div className="bg-white card-box border-20">
         <h4 className="dash-title-three">Overview</h4>
         <div className="dash-input-wrapper mb-30">
            <label htmlFor="title">Property Title*</label>
            <input 
               type="text" 
               placeholder="Your Property Name" 
               name="title"
               onChange={handleInputChange} 
            />
         </div>
         <div className="dash-input-wrapper mb-30">
            <label htmlFor="description">Description*</label>
            <textarea 
               className="size-lg" 
               placeholder="Write about property..."
               name="description"
               onChange={handleInputChange} 
            />
         </div>
         <div className="row align-items-end">
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="category">Category*</label>
                  <NiceSelect 
                     className="nice-select"
                     options={[
                        { value: "1", text: "Apartments" },
                        { value: "2", text: "PG's" },
                        { value: "3", text: "Houses" },
                        { value: "4", text: "Mansion" },
                        { value: "5", text: "Villas" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="category"
                     placeholder="Select Category" 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="listedIn">Listed in*</label>
                  <NiceSelect 
                     className="nice-select"
                     options={[
                        { value: "1", text: "All Listing" },
                        { value: "2", text: "Buy" },
                        { value: "3", text: "Sell" },
                        { value: "4", text: "Rent" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name="listedIn"
                     placeholder="Select Listing Type" 
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="dash-input-wrapper mb-30">
                  <label htmlFor="price">Price*</label>
                  <input 
                     type="text" 
                     placeholder="Your Price" 
                     name="price"
                     onChange={handleInputChange}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Overview;
