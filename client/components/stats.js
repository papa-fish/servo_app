import { fetchStats } from "../servos_api.js";

const statsInfoSection = document.querySelector('.stats-info')

fetchStats()
    .then(renderStats)

function renderStats(stats) {
    const totalWrapper = document.createElement('div')
    totalWrapper.classList.add('stats-total')
    const totalStations = document.createElement('div')
    const totalOwners = document.createElement('div')
    totalStations.textContent = `Total stations: ${stats.total_stations}`
    totalOwners.textContent = `Total owners: ${stats.total_owners}`
    totalWrapper.appendChild(totalStations)
    totalWrapper.appendChild(totalOwners)
    statsInfoSection.appendChild(totalWrapper)
    renderStations(stats)
}

function renderStations(stats) {
    const stations = stats.owners
    const stationItemsWrapper = document.createElement('div')
    stationItemsWrapper.classList.add('stats-items-wrapper')
    for (let i=0; i<10; i++) {
        const statsItems = document.createElement('div')
        statsItems.classList.add('stats-items')
        const stationOwnerName = document.createElement('div')
        stationOwnerName.textContent = stations[i].owner
        const stationCount = document.createElement('div')
        stationCount.textContent = stations[i].total
        statsItems.appendChild(stationOwnerName)
        statsItems.appendChild(stationCount)
        stationItemsWrapper.appendChild(statsItems)
        statsInfoSection.appendChild(stationItemsWrapper)
    }
}

/* <section class="stats-info">
<header class="stats-header">
  <div>Stats</div>
</header>
<div class="stats-total">
  <div>total station: 5244</div>
  <div>total owners: 32</div>
</div>
<div class="stats-items-wrapper">
  <div class="stats-items">
    <div>Caltech</div>
    <div>5423</div>
  </div>
  <div class="stats-items">
    <div>Newman</div>
    <div>6</div>
  </div>
</div>
</section> */