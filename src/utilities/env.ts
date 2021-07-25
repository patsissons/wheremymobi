const {
  GOOGLE_MAPS_API_KEY,
  // eslint-disable-next-line no-process-env
} = process.env;

export function gmapKey() {
  if (GOOGLE_MAPS_API_KEY) {
    return GOOGLE_MAPS_API_KEY;
  }

  return atob('QUl6YVN5QmtveTcwa0EtLWU3S21iRGhsUDdWY3NJQkNKZ3N6elFz');
}
