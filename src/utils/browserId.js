import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'bookmarkHub-browserId';

export function getBrowserId() {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
