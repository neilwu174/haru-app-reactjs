import React, { useState, useEffect } from 'react';
import './App.css';
import {doFetch,doDelete} from './api.js';

function Home(props) {
  const [data, setData] = useState(null);
  const fetch_url = async (path) => {
    try {
      const result = await doFetch(path);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const delete_url = async (path, parent) => {
    try {
      // console.log('Deleting data from http://localhost:18080/json/computer/delete?name=' + path + ' parent=' + parent);
      // const response = await fetch('http://localhost:18080/json/computer/delete?name=' + path + '&parent=' + parent, {
      //   method: 'GET'
      // });
      // const result = await response.json();
      // setData(result);
      const result = await doDelete(path,parent);
      setData(result);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Define an async function to handle the request
    const fetchData = async () => {
      // try {
      //   console.log('Fetching data from http://localhost:18080/json/computer/folder?name=/');
      //   const response = await fetch('http://localhost:18080/json/computer/folder?name=/');
      //   const result = await response.json();
      //   setData(result);
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }
      await fetch_url(props.path);      
    };

    fetchData();
  }, []); // Empty dependency array means this runs only once on mount
  
  const changeComponent = (path) => {
    console.log("addComponent", path);
    const fetchData = async () => {
      await fetch_url(path);
    };

    fetchData();
  };
  const deleteComponent = (path,parent) => {
    console.log("deleteComponent", path, parent);
    const fetchData = async () => {
      await delete_url(path,parent);
    };

    fetchData();
  }

  // const folder = JSON.stringify(data);
  // console.log("folder=" + data);
  // console.log("folder.folders=" + data.folders);
  // console.log("folder.files=" + data.files);
  return (
    // <div>{data ? <pre>{JSON.stringify(data)}</pre> : 'Loading...'}</div>
    <div className="container">
      {data ?
        <table className="table table-sm">
            <thead>
            <tr>
                <th className='text-start' scope="col">Image</th>
                <th className='text-start' scope="col">Size</th>
                <th className='text-start' scope="col">Last Updated</th>
                <th className='text-start' scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className='text-start'><img src="/app/images/parent.png" width="25" height="25"></img>
                    <button className="btn btn-link" onClick={() => changeComponent(data.parent)}>{data.parent}</button>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className='text-start'><img src="/app/images/current.png" width="25" height="25"></img>{data.current}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            {data.folders && data.folders.map((child) => (
                <tr>
                  <td className='text-start'><img src="/app/images/folder.png" width="25" height="25"></img>
                    <button className="btn btn-link" onClick={() => changeComponent(child.path)}>{child.name}</button>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="btn btn-link" onClick={() => deleteComponent(child.path,data.current)}>Delete</button>
                    <button className="btn btn-link" onClick={() => props.onUpdate("unknown")}>Update</button>
                  </td>
                </tr>
            ))}
            {data.files && data.files.map((child) => (
                <tr>
                  <td className='text-start'><img src="/app/images/file.png" width="25" height="25"></img>
                    {child.name}
                  </td>
                  <td>{child.size}</td>
                  <td>{child.modified_date}</td>
                  <td>
                  <td>
                    <button className="btn btn-link" onClick={() => deleteComponent(child.path,data.current)}>Delete</button>
                  </td>
                  </td>
                </tr>
            ))}
            </tbody>
        </table>
        : 'Loading...'}
    </div>

  );
}

export default Home
