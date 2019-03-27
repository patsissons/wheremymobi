import {Station} from '~/station';

const marker = `
<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
  <path id="bg" fill="#ffffff" d="m77.438,31.70225c-0.139,-5.802 -1.797,-10.248 -4.202,-14.012c-2.307,-3.607 -5.341,-6.666 -9.258,-8.958c-4.793,-2.803 -11.556,-4.639 -18.766,-3.553c-8.819,1.33 -15.391,6.39 -19.316,12.561c-2.385,3.752 -4.039,8.341 -4.152,14.062c-0.117,5.854 1.706,10.369 3.954,14.261c1.122,1.948 2.132,3.929 3.302,5.805c3.504,5.621 7.291,10.97 10.559,16.765c4.406,7.812 8.044,16.242 10.108,26.371c2.984,-15.367 9.802,-26.583 17.063,-37.58c2.439,-3.692 4.867,-7.382 6.806,-11.41c0.993,-2.063 2.107,-3.996 2.803,-6.306c0.684,-2.283 1.172,-5.035 1.099,-8.006z"/>
  <path id="fill" fill="currentColor" d="M77.438,31.834c-0.139-5.802-1.797-10.248-4.202-14.012c-2.307-3.607-5.341-6.666-9.258-8.958   c-4.793-2.803-11.556-4.639-18.766-3.553c-8.819,1.33-15.391,6.39-19.316,12.561c-2.385,3.752-4.039,8.341-4.152,14.062   c-0.117,5.854,1.706,10.369,3.954,14.261C26.82,48.143,27.83,50.124,29,52c3.504,5.621,7.291,10.97,10.559,16.765   c4.406,7.812,8.044,16.242,10.108,26.371c2.984-15.367,9.802-26.583,17.063-37.58c2.439-3.692,4.867-7.382,6.806-11.41   c0.993-2.063,2.107-3.996,2.803-6.306C77.023,37.557,77.511,34.805,77.438,31.834z M49.685,52.47   c-11.004,0-19.923-8.92-19.923-19.923c0-11.002,8.919-19.922,19.923-19.922c11.003,0,19.923,8.92,19.923,19.922   C69.607,43.55,60.688,52.47,49.685,52.47z"/>
</svg>`.trim();

export function getFillColor({bikes}: Station): string {
  if (bikes > 10) {
    return 'forestgreen';
  }

  if (bikes > 5) {
    return 'coral';
  }

  return 'crimson';
}

function markerWithFillColor(station: Station) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    marker.replace(/fill="currentColor"/, `fill="${getFillColor(station)}"`),
  )}`;
}

export function createIcon(station: Station): google.maps.Icon {
  return {
    url: markerWithFillColor(station),
    labelOrigin: new google.maps.Point(49, 33),
  };
}
