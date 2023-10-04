import React, { useState } from 'react';
import { Page, Navbar, Block, BlockTitle, Button } from 'framework7-react';

const LocationPage = () => {
    const [location, setLocation] = useState(null);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => console.error('Error getting location:', error)
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <Page>
            <Navbar title="Location" backLink="Back" />
            <BlockTitle>Access Location</BlockTitle>
            <Block>
                <Button fill large onClick={handleGetLocation}>Get My Location</Button>
            </Block>
            {location && (
                <Block>
                    <p>Your location:</p>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </Block>
            )}
        </Page>
    );
};

export default LocationPage;
