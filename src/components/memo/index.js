import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "space-between",
        height: 200,
        marginBottom: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        // flex: '1 0 auto',
        fontWeight: "bold"
    },
    cover: {
        width: "70px",
        height: "70px",
        backgroundSize: "contain",
        borderRadius: "10px",
    },
    smallText: {
        fontSize: 12
    }
}));

export default function Memo(props) {
    const classes = useStyles();
    //const theme = useTheme();

    return (
        <Grid item xs={6}>
            {/* <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography style={{ 'text-decoration': 'underline' }} component="h6" variant="h6">
                            {props.title}
                        </Typography>
                        <br></br>
                        <Typography className={'text-primary'}>
                            {props.body.map((data) => (
                                <p className={'small-text'}>{data}</p>
                            ))}
                        </Typography>

                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={props.image}
                />
            </Card> */}
            <Box sx={{
                boxShadow: "rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px",
                p: 2,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 100,
                marginBottom: 10,
                backgroundColor: "white",
            }}>
                <Box sx={{ pr: 1 }} >
                    <Typography component="h6" variant="h6" className={classes.content}>
                        {props.title}
                    </Typography>
                    {props.body.map((data) => (
                        <Typography variant="body2" style={{ margin: "7px 0px" }}>{data}</Typography>
                    ))}
                </Box>
                <Box sx={{ background: "linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))", borderRadius: "10px", p: 0.4 }}>
                    <CardMedia
                        className={classes.cover}
                        image={props.image}
                        component="img"
                        alt=""
                    />
                </Box>

            </Box>

        </Grid>
    );
}