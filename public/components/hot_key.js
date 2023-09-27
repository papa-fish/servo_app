const sideBars = document.querySelectorAll('.flex-wrapper');
const mapElement = document.getElementById('map');
let isMapExpanded = false;
let mapOriginalPosition = '';
let mapOriginalWidth = '';
let mapOriginalHeight = '';

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'b' && event.ctrlKey) {
        event.preventDefault();
        sideBars.forEach((sidebar) => {
            sidebar.style.visibility = sidebar.style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
        if (isMapExpanded) {
            mapElement.style.position = mapOriginalPosition;
            mapElement.style.width = mapOriginalWidth;
            mapElement.style.height = mapOriginalHeight;
        } else {
            mapOriginalPosition = mapElement.style.position;
            mapOriginalWidth = mapElement.style.width;
            mapOriginalHeight = mapElement.style.height;
            mapElement.style.position = 'fixed';
            mapElement.style.width = '100%';
            mapElement.style.height = '100%';
        }
        isMapExpanded = !isMapExpanded;
    }
});
