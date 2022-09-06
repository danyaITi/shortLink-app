import React, { useEffect, useRef, useState } from "react"
import './Sort.scss'

interface SortProps {
  changeSort: (item:string) => void,
  selected:string
}

type OutsideCkick = MouseEvent & {
  path: Node[];
};

const Sort: React.FC<SortProps> = ({changeSort,selected}) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [open,setOpen] = useState(false)
  const [order] = useState([
	{name: 'Short ссылке(asc)', sortProperty:'asc_short'},
	{name: 'Исходной ссылке(asc)', sortProperty:'asc_target'},
	{name: 'Колич-ву(asc)', sortProperty:'asc_counter'},

	{name: 'Short ссылке(desc)', sortProperty:'desc_short'},
	{name: 'Исходной ссылке(desc)', sortProperty:'desc_target'},
	{name: 'Колич-ву(desc)', sortProperty:'desc_counter'}
])

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const ev = event as OutsideCkick;
      if (sortRef.current && !ev.path.includes(sortRef.current)) {
        setOpen(false)
      }
    };
    document.body.addEventListener("click", clickOutside);
    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, []);

  return(
    <div className="sort-box" ref={sortRef}>
      <div className='sort-box__active' onClick={()=>setOpen(!open)}>
        Сортировка по:{" "}
        <span className='sort-item__active'>{selected}</span>
      </div>
      {open && (
        <ul className="sort-content">{order.map((item,i)=> 
          (<li 
          className="sort-item" 
          key={i} 
          onClick={()=>changeSort(item.sortProperty)}>{item.name}</li>))}
        </ul>
      )}
    </div>
  )
}

export default Sort
