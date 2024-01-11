"use client";
import useJohnsonsRule from '@/Hooks/useJohnsonsRule';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const { johnsonsRule } = useJohnsonsRule();
  const [showSequence, setShowSequence] = useState(false)
  const [sequenceState, setSequenceState] = useState([])
  const [tableData, setTableData] = useState([]);
  console.log('tableData1', tableData);
  const handleTableRow = () => {
    const newRow = { job: '', M1: '', M2: '' };
    setTableData([...tableData, newRow]);
  };

  const handleInputChange = (index, key, value) => {
    const updatedData = [...tableData];
    updatedData[index][key] = value;
    setTableData(updatedData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('file', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const fileContent = JSON.parse(event.target.result);
          setTableData(fileContent);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setTableData([])
    setSequenceState([])
    setShowSequence(false);

  }

  const downloadJsonFile = async () => {
    try {
      const response = await fetch('/jobsData2.json');
      const jsonData = await response.json();

      const jsonContent = JSON.stringify(jsonData);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading JSON file:', error);
    }
  };

  const handleSubmit = () => {
    const jobSequence = johnsonsRule(tableData);
    setSequenceState(jobSequence)
    console.log(jobSequence.length === 0);
    if (jobSequence.length === 0) {
      // Show toast error
      console.log('erere');
      toast.error('Error in job sequence calculation. Please check your input data.');
    } else {
      console.log('Job Sequence:', jobSequence);
      setShowSequence(true);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center  py-10 px-24">
      <header className='flex justify-center items-center mb-10'>
        <img className='w-20 	' src="/logo_akshay.png" alt="logo_akshay" />
        <button className="bg-indigo-500 px-4 py-2 rounded-md	mt-5 mb-4" onClick={downloadJsonFile}>
          Download JSON File
        </button>
      </header>
      <div className="text-white text-2xl	 mb-20 ">Johnson rule to sequence ‘n’ jobs on 2 machines</div>

      <table className=''>
        <tbody className='mb-10'>
          <tr className=''>
            <th>Job</th>
            <th>M1</th>
            <th>M2</th>
          </tr>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  className='text-black w-full h-auto p-1 rounded-sm outline-none'
                  placeholder='Enter Job Name'

                  value={rowData.job}
                  onChange={(e) => handleInputChange(index, 'job', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='text-black w-full h-auto p-1 rounded-sm outline-none'
                  placeholder='Enter M1 value'
                  value={rowData.M1}
                  onChange={(e) => handleInputChange(index, 'M1', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='text-black w-full h-auto p-1 rounded-sm outline-none'

                  placeholder='Enter M2 value'

                  value={rowData.M2}
                  onChange={(e) => handleInputChange(index, 'M2', e.target.value)}
                />
              </td>
            </tr>
          ))}

        </tbody>
        <tr>
          <td colSpan="3">
            <input type="file" onChange={(e) => handleFileChange(e)} accept=".json" />
          </td>
        </tr>
        {/* Add extra table row */}
        <button className="bg-indigo-500 px-4 py-2 rounded-md	mt-5 mr-4" onClick={() => handleTableRow()}>+ Add table row</button>
        <button className="bg-indigo-500 px-4 py-2 rounded-md	mt-5 mr-4" onClick={() => handleSubmit()}>Submit</button>
        <button
          className={`px-4 py-2 rounded-md mt-5 ${tableData.length === 0 ? 'bg-gray-500' : 'bg-indigo-500'}`}
          disabled={tableData.length === 0}
          onClick={() => handleClear()}
        >
          Clear
        </button>
      </table>
      {
        showSequence &&
        <div className="w-full mt-20">
          <h4 className='text-center text-xl	mb-10' >Solution:  Using Johnson rule the job sequence will be  </h4>
          <table className=''>
            <tbody className='mb-10'>
              <tr>
                <th>Sequence</th>
                <th>Job</th>
              </tr>
              {sequenceState.map((job, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{job.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      }
      {/* <footer className='absolute bottom-2 '>  <p>Developed by Akshay | Copyright © 2024 . All rights reserved.</p></footer> */}
    </main>
  )
}
