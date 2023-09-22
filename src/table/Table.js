import React,{useMemo,useState,useRef,useEffect} from 'react'
import './table.css'
import { useTable } from "react-table";
import {FaTrash,FaPen} from "react-icons/fa";


export default function Table() {
let ref=useRef()
   let [bool,setbool]=useState(false)
   let [inf,setinf]=useState(null)
   let [id,setid]=useState(0)

   const currentYear = new Date().getFullYear();
   const [selectedSubject, setSelectedSubject] = useState(' ');
   const [selectedTeacher, setSelectedTeacher] = useState('');
   const [selectedGroup, setSelectedGroup] = useState('');
   const [selectedClass, setSelectedClass] = useState('');
   const [selectedEducationYear, setSelectedEducationYear] = useState('');
   const [selectedYear, setSelectedYear] = useState();

  
let [table,settable]=useState([
  {id:0,Subject:" ",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""},
  {id:1,Subject:"",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""},
  {id:2,Subject:"",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""},
  {id:3,Subject:"",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""},
  {id:4,Subject:"",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""},
  {id:5,Subject:"",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""},
  {id:6,Subject:"",Teacher:"",class:"" ,Group:"",Educationyear:"",actions:""}
])

    const data = useMemo(() => table, [table]);
    useEffect(()=>{
      const maxId = table.reduce((max, row) => Math.max(max, row.id), 0);
      setid(maxId + 1);
    },[table])
 
    let add=()=>{
      setid((previd) => +previd + 1)
      let newRow = {
        id: id, 
        Subject: "",
        Teacher: "",
        class: "",
        Group: "",
        Educationyear: "",
        actions: ""
      };
      settable([...table, newRow]);
    }
    const columns = useMemo(
      () => [
        {
          Header: "Subject",
          accessor: "Subject",
        },
        {
          Header: "Teacher",
          accessor: "Teacher",
        },
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: 'Group',
          accessor: 'Group',
        },
        {
          Header: 'Education year',
          accessor: 'Educationyear', 
        },
       
        {
          Header: 'Action',
          accessor: "actions", // 
          Cell: ({ row }) => (
            <div className=' buttons'>
              <button onClick={() => handleEdit(row)}><FaPen/></button>
              <button onClick={() => handleDelete(row)}><FaTrash/></button>   
            </div>
          ),
        }
      ],
      []
    );
      const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });

      const handleEdit = (row) => {  
        setbool(true)
        setinf(row)
        setSelectedSubject(row.original.Subject);
        setSelectedTeacher(row.original.Teacher);
        setSelectedClass(row.original.class);
        setSelectedGroup(row.original.Group);
        setSelectedEducationYear(row.original.Educationyear);
      };
      

      const handleDelete = (row) => {
        settable((prevTable) => prevTable.filter((item) => item.id !== row.original.id));
        
      };

      let cansel=()=>{
         setbool(false)
      }   
 
      let save=()=>{

        if (inf !== null) {
          let updatedTable = table.map((row) => {
            if (row.id === inf.original.id) {
              return {
                ...row,
                Subject: selectedSubject,
                Teacher: selectedTeacher,
                class: selectedClass,
                Group: selectedGroup,
                Educationyear:selectedEducationYear,
              };
            }
            return row;
          });
   
          if(bool===true && selectedSubject ==="" && selectedTeacher==="" && selectedGroup===""&& selectedClass===""&& selectedEducationYear===""){
            setbool(true)
          }if(bool===true  && selectedSubject !=="" && selectedTeacher!=="" && selectedGroup!==""&& selectedClass!==""&& selectedEducationYear!==""){
          setbool(false)
        }
            settable(updatedTable)
         } 
        }
        const yearOptions = [];
        for (let year = 2000; year <= currentYear; year++) {
          yearOptions.push(
            <option key={year} value={year}>
              {year}
            </option>
          );
        }   

  return (
    <div className='cont'>
        {bool?(
  <div className='table_one'> 
<div className='selects'>
<select name="format" id="format" onChange={(r) => { setSelectedSubject(r.target.value) }} >
      <option selected disabled>Choose a Subject</option>
      <option value="English">English</option>
      <option value="History">History</option>
      <option value="Geography">Geography</option>
      <option value="Biology">Biology</option>
      <option value="Iiterature">literature</option>
   </select>
   <select name="format" id="format"  onChange={(r)=>{ setSelectedTeacher(r.target.value)}}>
      <option selected disabled>Teacher</option>
      <option value="Mrs.Johnson">Mrs.Johnson</option>
      <option value="Mr.Smith">Mr.Smith</option>
      <option value="Mrs.Clark">Mrs.Clark</option>
      <option value="Mr.Wilson">Mr. Wilson</option>
      <option value="Miss Anderson">Miss Anderson</option>
   </select>
</div>
<div className='selects_two'>
<select name="format" id="format"  onChange={(r)=>{  setSelectedGroup(r.target.value)}}>
      <option selected disabled>Group</option>
      <option value="Group 1">Group 1</option>
      <option value="Group 2">Group 2</option>
      <option value="Group 3">Group 3</option>
      <option value="Group 4">Group 4</option>

   </select>
   <select name="format" id="format" className='year'   onChange={(r)=>{  setSelectedClass(r.target.value)}}>
      <option selected disabled>Class</option>
      <option value="Class 1">Class 1</option>
      <option value="Class 2">Class 2</option>
      <option value="Class 3">Class 3</option>
      <option value="Class 4">Class 4</option>
   </select>
</div>
<div className='selects_three'>

<select
        id="format"
        value={selectedYear}
        onChange={(r)=>{setSelectedEducationYear  (r.target.value)}}
      >
         <option selected disabled>Education year</option>
        {yearOptions}
      </select>
 
</div>
  <div className='button_div'>
  <button onClick={()=>save()} className='btn_one'>Save</button>
  <button onClick={()=>cansel()} className='btn'>Cansel</button>
  </div>
  </div>
          ) : null} 
          <div className='s'>
 <table {...getTableProps()}>
          <thead >
            {headerGroups.map((headerGroup) => (
              <tr  {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                    return(
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                    )
})}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell,index) => {
                   return(
                    <td key={index} {...cell.getCellProps()}> {cell.render("Cell")} </td>
                   )
                })}         
                </tr>
              );
            })}
          </tbody>
  </table>  
  </div>  
  <button className='btn_two' onClick={()=>add()}>Add more</button>
    </div>
  )
}