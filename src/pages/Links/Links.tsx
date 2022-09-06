import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../api";
import { useSqueeze } from "../../hooks/useSqueeze";
import { useStatistics } from "../../hooks/useStatistic";
import './Links.scss'
import InfiniteScroll from 'react-infinite-scroller';
import {Col, Container, Dropdown, Row, Table} from "react-bootstrap";
import {truncateString} from "../../utils/truncate";
import err404 from '../../assets/img/404.png'

const Links: React.FC = () => {
    const [link, setLink] = useState<string>('')
    const [shortLink, setShortLink] = useState<string>('')
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [sortOrder, setSortOrder] = useState('asc_short');
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState(false)

    const { statistics, fetchStatistics, selectSort } = useStatistics();
    const { squeeze } = useSqueeze();


    useEffect(() => {
        setLoading(true)
        fetchStatistics(0, sortOrder).then(c => {
            
            if(c < 20){
                setHasMore(false)
            }
            else {
                setHasMore(true)
            }
            setLoading(false)
        }).catch((e)=>{
            if(e.response.status === 404){
                setErr(true)
            }
        })
    }, [])

 
    const generateLink = (short: string) => {
        const baseUrl = API_URL + /s/
        return baseUrl + short
    }

	const getShortLink = async () => {
        setError(null)
        try {
            const squeezeLink = await squeeze(link)
            setShortLink(squeezeLink.data.short)
        }
		catch (e: any) {
            setShortLink('')
            setError('Неверный формат ссылки')
        }
	}

    const loadFunc = async () => {
        const length = await fetchStatistics(offset, sortOrder)

        if (length < 20) {
            setHasMore(false)
        }
        setOffset(offset + 20)
    }


    const sortHandler = (key: string | null) => {
        if(key) {
            let keyOrder = ''
            if(sortOrder.indexOf(key) !== -1) {
                if(sortOrder.indexOf('asc') !== -1) {
                    keyOrder = 'desc_' + key
                }
                else {
                    keyOrder = 'asc_' + key
                }
            }
            else {
                keyOrder = 'asc_' + key
            }
            setSortOrder(keyOrder)
            selectSort(keyOrder)
        }
    }

    const getSortIcon = (key: string | null) => {
        if(key) {
            if(sortOrder.indexOf(key) !== -1) {
                if(sortOrder.indexOf('asc') !== -1) {
                    return '▲'
                }
                else {
                    return '▼'
                }
            }
        }
        return ''
    }

    return(
        <Container>
            <Row className="input-box justify-content-md-center">
                <Col md={6}>
                    <input type="text" value={link} onChange={(e)=>setLink(e.target.value)} />
                </Col>
                <Col md={"auto"}>
                    <button className="btn-add" onClick={getShortLink}>Сократить</button>
                </Col>

            </Row>
            <Row>
                <Col>
                    {error && <div className="error">{error}</div>}
                    {shortLink && <div className="short-link">Ваша ссылка: <span onClick={() => {navigator.clipboard.writeText(generateLink(shortLink))}} className="short-link__clipboard">{generateLink(shortLink)}</span></div>}
                </Col>
            </Row>
            <Dropdown onSelect={(e:any) => sortHandler(e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Сортировать по
                </Dropdown.Toggle>

                <Dropdown.Menu  >
                    <Dropdown.Item eventKey={"short"}>Short {getSortIcon('short')}</Dropdown.Item>
                    <Dropdown.Item eventKey={"target"}>Target {getSortIcon('target')}</Dropdown.Item>
                    <Dropdown.Item eventKey={"counter"}>Count {getSortIcon('counter')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            
            {err ? (<img className="err404" src={err404} alt='Error 404'/>) 
                : <Table className="links-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Short</th>
                        <th>Target</th>
                        <th>Count</th>
                    </tr>
                </thead>

                {loading ? (<h2>Загрузка...</h2>):
                <>
                    <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={hasMore}
                    element={'tbody'}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {!statistics.length ? (<h2 style={{marginTop: '10px'}}>Вы еще не сокращали ссылки...</h2>)
                        : <>{statistics.map((item,i) =>
                            (
                                <tr key={i}>
                                    <td><a target="_blank" href={generateLink(item.short)}>{generateLink(item.short)}</a></td>
                                    <td><a target="_blank" href={item.target}>{truncateString(item.target, 100)}</a></td>
                                    <td>{item.counter}</td>
                                </tr>
                            )
                        )}</>}
                    </InfiniteScroll>
                </>}
            </Table> }
        </Container>
    )
}

export default observer(Links)


