import NiceSelect from "../../../ui/NiceSelect";

const DropdownOne = ({ style }: any) => {
  const selectHandler = () => {};

  const searchHandler = () => {
    window.location.href = "/listing_0";
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchHandler();
      }}
    >
      <div className="row gx-0 align-items-center">
        <div className="col-xl-3 col-lg-4">
          <div className="input-box-one border-left">
            <div className="label">I’m looking to...</div>
            <NiceSelect
              className={`nice-select ${style ? "fw-normal" : ""}`}
              options={[
                { value: "condos", text: "Rent Houses" },
                { value: "houses", text: "Sell Houses" },
                { value: "industrial", text: "Looking For PG Men's" },
                { value: "villas", text: "Looking For PG Women's" },
                { value: "villas", text: "Looking For PG Co-Living" },
                { value: "apartments", text: "Buy Apartments" },
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
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
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
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
               { value: "7", text: "₹30,000 - ₹50,000" }
              ]}
              defaultCurrent={0}
              onChange={selectHandler}
              name=""
              placeholder=""
            />
          </div>
        </div>
        <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
          <div className="input-box-one lg-mt-10">
            <button
              className={`fw-500 tran3s ${
                style
                  ? "w-100 tran3s search-btn-three"
                  : "text-uppercase search-btn"
              }`}
            >
              {style ? "Search Now" : "Search"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DropdownOne;
