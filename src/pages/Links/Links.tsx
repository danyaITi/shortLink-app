import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { API_URL } from "../../api";
import { useSqueeze } from "../../hooks/useSqueeze";
import { useStatistics } from "../../hooks/useStatistic";
import Login from "../Login/Login";
import './Links.scss'

const Links: React.FC = () => {
    const [link, setLink] = useState<string>('')
    const {store} = useContext(Context)

    const baseUrl = API_URL + /s/

    const [shortLink, setShortLink] = useState<string>('')
	const { statistics, fetchStatistics, addStatistics } = useStatistics();
	const { squeeze } = useSqueeze();

    useEffect(()=>{
        fetchStatistics()
    },[])

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         store.checkAuth()
    //     }
    // }, [])

    if (!store.isLogin){
        return <Login/>
    }

	const getShortLink = async () => {
		const squeezeLink = await squeeze(link)
        console.log(squeezeLink)
		setShortLink(squeezeLink.data.short)


		const statistic = {
			short: squeezeLink.data.short,
			counter: squeezeLink.data.counter,
			target: squeezeLink.data.target,
            id: squeezeLink.data.id
		}
		addStatistics(statistic)

	}

    
    
    return(
        <div>
            <input type="text" value={link} onChange={(e)=>setLink(e.target.value)} />
            <button onClick={getShortLink}>Add</button>
            <table>
                <tr>
                    <th>Original link</th>
                    <th>Count:</th>
                    <th>Short link</th>
                </tr>             
                {statistics.map((item)=> (<tr><td><a href={baseUrl+item.short}>{baseUrl+item.short}</a></td>
                <td>{item.counter}</td></tr>))}             
                <tr>
                    {/* <td>25.4</td>
                    <td>30.2</td>
                    <td>33.3</td> */}
                </tr>
                <tr>
                    {/* <td>20.4</td>
                    <td>15.6</td>
                    <td>22.3</td> */}
                </tr>
            </table>
            <button onClick={()=> store.logout()} className='btn-exit'>Exit</button>
        </div>
    )
}

export default observer(Links)