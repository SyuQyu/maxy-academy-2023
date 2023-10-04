
import React from 'react';
import { Navbar, Page, Block, Card, CardHeader, CardContent, Link, Button } from 'framework7-react';

export default (res) => (
    <div className="demo-expandable-cards">
        {
            console.log(res, 'data from cards.jsx')
        }
        <Card expandable backdrop={false}>
            <CardContent padding={false}>
                <div className={res?.data?.urgent ? "bg-color-red" : "bg-color-blue"} style={{ height: '300px' }}>
                    <CardHeader textColor="white" className="display-block">
                        {res?.data?.Judul}
                        <br />
                        <small style={{ opacity: 0.7 }}>{res?.data?.desc}</small>
                    </CardHeader>
                    <Link
                        cardClose
                        color="white"
                        className="card-opened-fade-in"
                        style={{ position: 'absolute', right: '15px', top: '15px' }}
                        iconF7="xmark_circle_fill"
                    />
                </div>
                <div className="card-content-padding">
                    <p>
                        {res?.data?.content}
                    </p>
                    <p>
                        <Button fill round large cardClose color="red">
                            Close
                        </Button>
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
);