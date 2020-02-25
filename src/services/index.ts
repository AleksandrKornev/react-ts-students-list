export function recordStorage(name: string, data: object) {
  let dataJson: string | null;

  try {
    dataJson = JSON.stringify(data);
  } catch(e) {
    throw new Error(e);
  }
  
  localStorage.setItem(name, dataJson);
  return true;
}


export function readStorage(name: string) {
  const dataJson = localStorage.getItem(name);
  let data: object | null;

  try {
    data = JSON.parse(dataJson as string);
  } catch(e) {
    throw new Error(e);
  }

  return data;
}