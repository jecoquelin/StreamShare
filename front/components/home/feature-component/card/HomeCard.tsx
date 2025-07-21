import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./HomeCard.css"

interface HomeCardProps {
    title: string;
    content: string;
}

export default function HomeCard({ title, content }: HomeCardProps) {
    return (
        <Card className="card">
            <CardActionArea
                style={{ height: '100%'}}
            >
                <CardMedia
                    component="img"
                    style={{ height: '25vh' }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

