import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../api";
import { useSqueeze } from "../../hooks/useSqueeze";
import { useStatistics } from "../../hooks/useStatistic";
import './Links.scss'
import InfiniteScroll from 'react-infinite-scroller';
import {Col, Container, Dropdown, Row, Table} from "react-bootstrap";
import {truncateString} from "../../utils/truncate";

const Links: React.FC = () => {
    const [link, setLink] = useState<string>('')
    const [shortLink, setShortLink] = useState<string>('')
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [sortOrder, setSortOrder] = useState('asc_short'); 

    const { statistics, fetchStatistics, selectSort } = useStatistics();
    const { squeeze } = useSqueeze();


    useEffect(() => {
        fetchStatistics(0, sortOrder).then(c => {
            if(c < 20){
                setHasMore(false)
            }
            else {
                setHasMore(true)
            }
        })
    }, [])


    const generateLink = (short: string) => {
        const baseUrl = API_URL + /s/
        return baseUrl + short
    }

	const getShortLink = async () => {
		const squeezeLink = await squeeze(link)
		setShortLink(squeezeLink.data.short)
	}

    const loadFunc = async () => {
        const length = await fetchStatistics(offset, sortOrder)

        if (length < 20) {
            setHasMore(false)
        }
        setOffset(offset + 20)
    }


    const sortHandler = (key: string | null) => {
        if(key){
            const sort = `asc_${key}`
            selectSort(sort)
            setSortOrder(sort)
        }
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
                    {shortLink && <div className="short-link">Ваша ссылка: {generateLink(shortLink)} </div>}
                </Col>
            </Row> 

            <Dropdown onSelect={(e:any) => sortHandler(e)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Сортировать по
                </Dropdown.Toggle>

                <Dropdown.Menu  >
                    <Dropdown.Item eventKey={"short"}>Short {sortOrder === 'asc_short' ? (<span>↓</span>) : (<span>☻</span>)}</Dropdown.Item>
                    <Dropdown.Item eventKey={"target"}>Target {sortOrder === 'asc_target' ? (<span>↓</span>) : (<span>☻</span>)}</Dropdown.Item>
                    <Dropdown.Item eventKey={"counter"}>Count {sortOrder === 'asc_counter' ? (<span>↓</span>) : (<span>☻</span>)}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

                    <Table className="links-table" striped bordered hover>
                        <thead>
                        <tr>
                            <th>Short</th>
                            <th>Target</th>
                            <th>Count</th>
                        </tr>
                        </thead>

                        <InfiniteScroll

                            pageStart={0}
                            loadMore={loadFunc}
                            hasMore={hasMore}
                            element={'tbody'}
                            loader={<div className="loader">Loading ...</div>}
                        >
                            {statistics.map((item,i) =>
                                (
                                    <tr key={i}>
                                        <td><a target="_blank" href={generateLink(item.short)}>{generateLink(item.short)}</a></td>
                                        <td><a target="_blank" href={item.target}>{truncateString(item.target, 100)}</a></td>
                                        <td>{item.counter}</td>
                                    </tr>
                                )
                            )}
                        </InfiniteScroll>

                    </Table>


        </Container>

    )
}

export default observer(Links)


