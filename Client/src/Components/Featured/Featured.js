import { useEffect } from 'react';
import { Grid, Typography, Card } from '@mui/material';
import YouTube from 'react-youtube';

import './Style/Featured.css';

const Featured = () => {

    useEffect(() => {
        document.title = "Featured Recipes";
    }, [])
    return (
        <div className='f_paper' style={{ backgroundColor: "#fbe0dc" }}>
            {/* <div style={{ marginBottom: "20px", textAlign: "center", fontSize: "42px" }}> Featured Recipes </div> */}

            <Card className="f_card" data-aos="fade-up" data-aos-once="true" data-aos-duration="600">
                <Grid container columnSpacing={2}>
                    <Grid item xs={12} md={5} style={{}}>
                        <YouTube videoId='HfPYf0hc9dI' className='player' />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h5'>Double Chocolate Pancake</Typography>
                        <Typography varient='subtitle1' mt={1}>
                            Fusion cuisine is one that combines elements of different culinary traditions. Cuisines of this type are not categorized according to any one particular cuisine style and have played a part in a number of innovations.
                            Fusion food is a general term for the combination of various forms of cookery and comes in several forms.
                        </Typography>
                        <br/>
                        <Typography mt={1} variant='subtitle2' className='min_text'>
                            {`Prep Time : 11-15 minutes
                            Cook time : 16-20 minutes
                            Serve : 4
                            Level Of Cooking : Easy
                            Taste : Sweet`}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

            <Card className="f_card" data-aos="fade-up" data-aos-once="true" data-aos-duration="1000">
                <Grid container columnSpacing={2}>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h5'>Margherita Pizza at Home</Typography>
                        <Typography varient='subtitle1' mt={1}>
                            This is a very quick at-home recipe for making Margherita pizza - using rosemary instead of basil for a twist on the classic. This recipe takes you right from dough to topping. Cook it in a frying pan to recreate the searing heat of a pizza oven at home.
                        </Typography>
                        <br/>
                        <Typography mt={1} variant='subtitle2' className='min_text'>
                            {`Prep Time : 10-15 minutes
                                Cook time : 12-15 minutes
                                Serve : 4
                                Level Of Cooking : Medium
                                Taste : Savory, Fresh, Slightly Tangy
                            `}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5} style={{}}>
                        <YouTube videoId='vcfNpDtVqOw' className='player right' loading="lazy" />
                    </Grid>
                </Grid>
            </Card>

            <Card className="f_card">
                <Grid container columnSpacing={2}>
                    <Grid item xs={12} md={5} style={{}}>
                        <YouTube videoId='2DirEw0Z4cg' className='player' />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h5'>Paneer Makhni</Typography>
                        <Typography varient='subtitle1' mt={1}>
                            Paneer makhani is a slightly sweet dish of paneer, originating from the Indian subcontinent, in which the gravy is prepared usually with butter, tomatoes and cashews. Spices such as red chili powder and garam masala are also used to prepare this gravy.
                        </Typography>
                        <br/>
                        <Typography mt={1} variant='subtitle2' className='min_text'>
                            {`Prep Time : 11-15 minutes
                            Cook time : 20-25 minutes
                            Serve : 4
                            Level Of Cooking : Medium
                            Taste : Sweet`}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
            
            <Card className="f_card" data-aos="fade-up" data-aos-once="true" data-aos-duration="1000">
                <Grid container columnSpacing={2}>
                    <Grid item xs={12} md={7}>
                        <Typography variant='h5'>Honey Chilli Potatoes</Typography>
                        <Typography varient='subtitle1' mt={1}>
                            Chinese food is an integral part of the Indian culinary scene. In Indian Chinese cuisine the food is modified to suit Indian palate. In this Chinese seasoning and cooking techniques are adapted to Indian tastes and contain larger offering of vegetarian dishes. Today, it is not only enjoyed by the Indians but is also highly appreciated in in Malaysia, Singapore and North America.
                        </Typography>
                        <br/>
                        <Typography mt={1} variant='subtitle2' className='min_text'>
                            {`Prep Time : 6-10 minutes
                            Cook time : 16-20 minutes
                            Serve : 4
                            Level Of Cooking : Easy
                            Taste : Tangy
                            `}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5} style={{}}>
                        <YouTube videoId='6j83yoQm8pU' className='player right' loading="lazy" />
                    </Grid>
                </Grid>
            </Card>

        </div >
    );

}

export default Featured;



