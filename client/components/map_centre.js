const mapCenter = document.querySelector(".center-location");

export function mapCentreLocation(position, map) {
    mapCenter.innerHTML =`
  <h3> Map Centre </h3>
  <p>Lat ${position.lat} </p>
  <p>Long ${position.lng} </p>`

  map.addListener("dragend", () => {
    let centerLocation = map.getCenter();
    let lat = centerLocation.lat();
    let long = centerLocation.lng();
 
    mapCenter.innerHTML =`
    <h3> Map Centre </h3>
    <p>Lat ${lat} </p>
    <p>Long ${long} </p>`
  })
};
