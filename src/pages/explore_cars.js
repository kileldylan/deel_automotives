import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Import the Supabase client
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Button } from "@mui/material";

function CarsPage() {
    const [cars, setcars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom align="center">
                Vehicle Inventory
            </Typography>

            {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <Grid container spacing={3}>
                    {cars.map(vehicle => (
                        <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography variant="h6">{vehicle.brand} - {vehicle.model}</Typography>
                                    <Typography colcanor="textSecondary">Price: ${vehicle.price}</Typography>
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
