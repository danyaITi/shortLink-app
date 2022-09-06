import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../api";
import { useSqueeze } from "../../hooks/useSqueeze";
import { useStatistics } from "../../hooks/useStatistic";
import './Links.scss'
import {Navbar} from "../../components/Navbar/Navbar";
import Sort from "../../components/Sort/Sort";

const Links: React.FC = () => {
    const [link, setLink] = useState<string>('')
    const [selected, setSelected] = useState('asc_short')
    const [shortLink, setShortLink] = useState<string>('')
    const [offset, setOffset] = useState(0)
    const [fetching, setFetching] = useState(true)
    

    const { statistics, fetchStatistics, addStatistics, setStatistics } = useStatistics();
    const { squeeze } = useSqueeze();

    useEffect(()=>{
        if(fetching){
			fetchStatistics(selected)
		}
    },[fetching, selected])
	

    useEffect(()=>{
        document.addEventListener('scroll', scrollHandler)

        return ()=>{
            document.removeEventListener('scroll',scrollHandler)
        }
    },[])

    const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
        
    }


    

    
    const generateLink = (short: string) => {
        const baseUrl = API_URL + /s/
        return baseUrl + short
    }

	const getShortLink = async () => {
		const squeezeLink = await squeeze(link)
		setShortLink(squeezeLink.data.short)

		const statistic = {
			short: squeezeLink.data.short,
			counter: squeezeLink.data.counter,
			target: squeezeLink.data.target,
            id: squeezeLink.data.id
		}
		addStatistics(statistic)
	}

    const changeSort = (item:string) => {
        setSelected(item)
    }
 


    return(
        <div>
            <Navbar />
            <div className="sort-position">
                <Sort  selected={selected} changeSort={(item)=>changeSort(item)}/>
            </div>
            <div style={{margin: '0px 20px'}}>
                <div className="input-box">
                    <input type="text" value={link} onChange={(e)=>setLink(e.target.value)} />
                    <button className="btn-add" onClick={getShortLink}>Сократить</button>
                </div>
                <table className="resp-tab"> 
                        <thead>
                            <tr>
                                <th>Short link</th>
                                <th>Count:</th>
                                <th>Original link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistics.map((item)=> (<tr key={item.id}><td>
                                <span>Short link</span><a target={'_blank'} href={generateLink(item.short)}>{generateLink(item.short)}</a></td>
                            <td style={{textAlign:'center'}}><span>Count:</span>{item.counter}</td>
                            <td><span>Original link</span>{item.target}</td></tr>))}
                        </tbody>
                </table>
            </div>
        </div>

    )
}

export default observer(Links)


