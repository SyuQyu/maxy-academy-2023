'use client';
import Header from './header/header';
import Footer from './footer/footer';
import Script from 'next/script';

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function DefaultLayout({ children }: Props) {
    return (
        <body id='layout-default'>
            <Header />
            <main className='main'>{children}</main>
            <TawkMessengerReact
                propertyId="651c3901e6bed319d0058048"
                widgetId="1hbr3tbl5"/>
            {/* <Script
                strategy="lazyOnload"
                src="https://embed.tawk.to/1hbr3tbl5"
            /> */}
            <Footer />
        </body>
    );
}

type Props = {
    children: React.ReactNode;
};
