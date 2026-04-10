// api.js
const API_BASE_URL = 'http://localhost:18080/json/computer';
export const doFetch = async (path) => {
    try {
      console.log('Fetching data from http://localhost:18080/json/computer/folder?name=' + path);
      const response = await fetch('http://localhost:18080/json/computer/folder?name=' + path);
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};
export const doDelete = async (path,parent) => {
  console.log('Deleting data from http://localhost:18080/json/computer/delete?name=' + path + ' parent=' + parent);
  const response = await fetch(API_BASE_URL + "/delete?name=" + path + "&parent=" + parent,{
        method: 'GET'
      });
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};
