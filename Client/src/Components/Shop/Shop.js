import { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FaHome, FaShoppingCart } from "react-icons/fa";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@mui/material/Skeleton';

import './Styles/Shop.css';

const Shop = () => {
    useEffect(() => {
        document.title = "Foodipes: Do Shopping";
    }, [])

    return (
        <div className='paper'>
            <BreadCrumb />
            <CardSContainer />
        </div>
    )
}

export default Shop;

const BreadCrumb = () => {
    return (
        <Breadcrumbs aria-label="breadcrumb" className='BreadCrumb'>
            <Link
                underline='hover'
                color="textSecondary"
                href="/"
            >
                <FaHome /> Home
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="textPrimary"
                href="/shop"
                aria-current="page"
            >
                <FaShoppingCart /> Shop
            </Link>
        </Breadcrumbs>
    )
}

const CardSContainer = () => {
    const [loading, setLoading] = useState(true);
    const [bookList, setBookList] = useState([])

    const API = process.env.REACT_APP_API
    const baseURL = `${API}/books`;

    useEffect(() => {
        const getBooks = async () => {
            try {
                await axios
                    .get(baseURL)
                    .then(res => {
                        setBookList(res.data);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            } catch (e) {
                console.log(e)
            }
        }
        getBooks();
    }, [baseURL]);

    if (loading) {
        return (
            <div className='cards_container'>
                {[...Array(6)].map((e, i) => <BooksLoading key={i} />)}
            </div>
        )
    } else {
        return (
            <div className='cards_container'>
                {bookList.map((item, id) => {
                    return (<BookCard
                        key={id}
                        url={item.url}
                        alt={item.title}
                        title={item.title}
                        price={item.price}
                        link={item.link}
                    />)
                })}
            </div>
        )
    }

}

const BookCard = ({ url, alt, title, price, link }) => {
    const handleLink = (link) => {
        window.open(link);
    }


    return (
        <div data-aos="fade-in" data-aos-once="true" data-aos-duration="1200">
            <Card className="card">
                <CardContent>
                    <img src={url} alt={alt} width="215px" style={{ maxHeight: "270px" }} loading='lazy' draggable="false" />
                    <Typography color="textPrimary" className='typography'>{title}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography color="textSecondary" className='typography'>${price}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='outlined' onClick={() => handleLink(link)}>
                                <FaShoppingCart />
                            </Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </div>
    )
}

const BooksLoading = () => {
    return (
        <Card className="card">
            <CardContent >
                <Skeleton variant="rectangular" width={215} height={270} />
                <Skeleton width={120} />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Skeleton width={30} />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton width={60} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}