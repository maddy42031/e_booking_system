import React from "react";

function Facility() {
  return (
    <>
      <div className="mt-4 br row p-2">
        <div className="col">
          <div className="h4">Hotel Facilities</div>
          <div className="row row-cols-sm-4 g-3 row-cols-1 mt-2">
            <div className="col ">
              <i className="bi bi-cup-hot"></i> Coffe/tea maker
            </div>
            <div className="col">
              <i className="bi bi-tv"></i> TV
            </div>
            <div className="col">
              <i className="bi bi-car-front"></i> Parking facility
            </div>
            <div className="col">
              <i className="bi bi-wifi"></i> Free wi-fi
            </div>
            <div className="col">
              <i className="bi bi-webcam"></i> CCTV cameras
            </div>
            <div className="col">
              <i className="bi bi-patch-check"></i> Private entrance
            </div>
            <div className="col">
              <i className="bi bi-patch-check"></i> Attached bathroom
            </div>
            <div className="col">
              <i className="bi bi-patch-check"></i> 24/7 check-in
            </div>
            <div className="col">
              <i className="bi bi-fan"></i> AC
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 br row p2">
        <div className="col">
          <div className="h4">What's nearby</div>
          <div className="row row-cols-1 g-2 row-cols-md-2 mt-2">
            <div className="col">
                <div className="h5">Restaurants</div>
                <p>Hotel Pratap Plaza</p>
                <p>Hotel Maris</p>
                <p>Grand Treat</p>
                <p>Bhuhari</p>
            </div>
            <div className="col">
                <div className="h5">Transportation</div>
                <p>Metro Station</p>
                <p>Skywalk</p>
                <p>VR mall</p>
                <p>Theater</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Facility;
