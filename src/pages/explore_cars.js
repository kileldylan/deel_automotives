import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Import the Supabase client
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Button } from "@mui/material";

function CarsPage() {
    const [cars, setcars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchcars = async () => {
            try {
                const { data, error } = await supabase.from("cars").select("*");
                if (error) throw error;
                setcars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchcars();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/carRoutes/cars/${id}`);
      };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom align="center">
                Vehicle Inventory Page
            </Typography>

            {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <Grid container spacing={3}>
                    {cars.map(car => (
                        <Grid item xs={12} sm={6} md={4} key={car.id}>
                            <Card sx={{ width: 300, cursor: 'pointer' }} onClick={() => handleCardClick(car.id)}>
                                <CardContent>
                                    <Typography variant="h6">{car.brand} - {car.model}</Typography>
                                    <Typography colcanor="textSecondary">Price: ${car.price}</Typography>
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default CarsPage;
