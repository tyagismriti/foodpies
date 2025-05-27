import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Divider, Grid, Stack, Typography } from "@mui/material";
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext'

import './post.css'

const Post = (props) => {
    const { recipeName: recipeURL } = useParams();
    const recipe_name = recipeURL?.split("-")?.join(" ");

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const [recipeTitle, setRecipeTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState({});
    const [ingredients, setIngredients] = useState([])
    const [garnish, setGarnish] = useState([])
    const [instructions, setInstructions] = useState([])
    const [notes, setNotes] = useState([])
    const [toppings, setToppings] = useState([])
    const [imgsrc, setImgsrc] = useState('')

    const API = process.env.REACT_APP_API;
    const baseURL = props?.recipeURL ? `${API}/posts/${props?.recipeURL}` : `${API}/posts/${recipeURL}`;
    const { user } = useAuthContext()

    useEffect(() => {
        document.title = `${recipe_name} recipe`.toUpperCase();
        
        const getPostData = async () => {
            try {
                const res = await axios.get(baseURL, { 
                    headers: {
                        Authorization: "Bearer " + user?.token,
                    } 
                })
                const data = await res.data
                if(data){
                    setPost(res.data);
                }
            } catch (e) {
                console.log(e.response?.data?.message)
            }
        }
        if (user?.token) {
            getPostData();
        }
        setLoading(false);
    }, [baseURL, recipe_name, user?.token])

    useEffect(() => {
        if (post) {
            setRecipeTitle(post["title"])
            setDescription(post["description"])
            setAuthor(post["author"])
            setTime(post["time"])
            setIngredients(post["ingredients"])
            setGarnish(post["garnish"])
            setInstructions(post["instructions"])
            setNotes(post["notes"])
            setToppings(post["toppings"])
            setImgsrc(post["imageURL"])
        }
    }, [post, recipe_name])

    if (loading) {
        return <>loading</>
    }

    return (
        <div className="post_bg">
            <Grid container style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={12} md={6}>
                    <h1 style={{ backgroundColor: "white", padding: "4px 12px" }}>{recipeTitle}</h1>
                    <Stack direction="row">
                        <div className="box">
                            <Typography variant="button">{time["prepTime"]}</Typography>
                            <Typography>Prep Time</Typography>
                        </div>
                        <div className="box">
                            <Typography variant="button">{time["cookTime"]}</Typography>
                            <Typography>Cook Time</Typography>
                        </div>
                        <div className="box">
                            <Typography variant="button">{time["totalTime"]}</Typography>
                            <Typography>Total Time</Typography>
                        </div>
                    </Stack>
                    <div className="box" style={{ marginTop: "20px" }}>
                        {`~~ By `}{author}
                    </div>
                    <h4 style={{ textAlign: "justify" }}>
                        {description}
                    </h4>
                </Grid>
                <Grid item xs={12} md={4} >
                    <Card elevation={2} sx={{ maxWidth: "400px" }} data-aos="fade-in" data-aos-once="true" data-aos-duration="800">
                        <CardMedia
                            component="img"
                            src={imgsrc}
                            alt={recipe_name}
                        />
                    </Card>
                </Grid>
            </Grid>




            <Stack direction="row" sx={{ mt: 1, mb: 2 }}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ mb: 1 }} className="i_card" data-aos="fade-in" data-aos-once="true" data-aos-duration="1000">
                            <h4 style={{ paddingLeft: "20px" }}>Ingredients</h4>
                            <Divider />
                            <div style={{ padding: "0 20px" }}>
                                <ol className="circle">
                                    {ingredients?.map((ingredient, key) => {
                                        if (ingredient?.startsWith("For")) {
                                            return (<li key={key}><b>{ingredient}</b></li>)
                                        } else {
                                            return (<li key={key}>{ingredient}</li>)
                                        }
                                    })}
                                </ol>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs ={12} md={8}>
                        <Card sx={{ mb: 3, width: "fit-content" }} data-aos="fade-in" data-aos-once="true" data-aos-duration="1000">
                            <h4 style={{ paddingLeft: "20px" }}>Instructions</h4>
                            <Divider />
                            <div style={{ padding: "20px" }}>
                                <ol className="circle">
                                    {instructions?.map((instruction, key) => {
                                        if (instruction?.startsWith("To")) {
                                            return <li key={key}><b>{instruction}</b></li>
                                        } else {
                                            return <li key={key}>{instruction}</li>
                                        }
                                    })}
                                </ol>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
            
            <Stack direction="row" sx={{ mt: 1, mb: 0 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} className="garnish_card">
                        {(garnish && garnish.length !== 0) ? (
                            <Card data-aos="fade-in" data-aos-once="true" data-aos-delay="200" data-aos-duration="1200">
                                <h4 style={{ paddingLeft: "20px" }}>Garnish</h4>
                                <Divider />
                                <div style={{ padding: "0 20px" }}>
                                    <ol className="circle">
                                        {garnish?.map((g, key) => (
                                            <li key={key}>{g}</li>
                                        ))}
                                    </ol>
                                </div>
                            </Card>
                        ) : (" ")}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        {(notes && notes?.length !== 0) ? (
                            <Card sx={{ mb: 1, width: "fit-content" }} className="i_card" data-aos="fade-in" data-aos-once="true" data-aos-duration="1000">
                                <h4 style={{ paddingLeft: "20px" }}>Notes</h4>
                                <Divider />
                                <div style={{ padding: "20px" }}>
                                    <ol className="circle">
                                        {notes?.map((note, key) => (
                                            <li key={key}>{note}</li>
                                        ))}
                                    </ol>
                                </div>
                            </Card>
                        ) : (" ")}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        {(toppings && toppings.length !== 0) ? (
                            <Card sx={{ mb: 1, width: "fit-content" }} data-aos="fade-in" data-aos-deay="400" data-aos-once="true" data-aos-duration="1000">
                                <h4 style={{ paddingLeft: "20px" }}>Toppings</h4>
                                <Divider />
                                <div style={{ padding: "20px" }}>
                                    <ol className="circle">
                                        {toppings?.map((topping, key) => (
                                            <li key={key}>{topping}</li>
                                        ))}
                                    </ol>
                                </div>
                            </Card>
                        ) : (" ")
                        }
                    </Grid>
                </Grid>
            </Stack>

        </div >

    )
}

export default Post;
