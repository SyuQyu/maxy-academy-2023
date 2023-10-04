import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Cards as CustomCard } from '@/components/index'

export default function Gallery() {

    const cardData = [
        {
            tipe: "Nature",
            headline: "Explore Beautiful Landscapes",
            desc: "Discover breathtaking landscapes from around the world. Immerse yourself in the natural beauty of mountains, forests, rivers, and more. Let these stunning scenes transport you to a world of wonder and awe.",
            learnMore: "https://example.com/learn-more1",
            image: "https://example.com/image1.jpg"
        },
        {
            tipe: "Art and Culture",
            headline: "Art and Culture Adventures",
            desc: "Embark on a journey through art and culture. Experience the rich tapestry of human creativity, from ancient masterpieces to contemporary expressions. Delve into the vibrant world of colors, shapes, and stories.",
            learnMore: "https://example.com/learn-more2",
            image: "https://example.com/image2.jpg"
        },
        {
            tipe: "Culinary",
            headline: "Culinary Delights of the World",
            desc: "Savor the flavors of different cultures as you explore diverse cuisines. Taste the spices, aromas, and textures that make each dish unique. From street food to gourmet delights, culinary adventures await.",
            learnMore: "https://example.com/learn-more3",
            image: "https://example.com/image3.jpg"
        },
        {
            tipe: "Architectural",
            headline: "Architectural Wonders",
            desc: "Marvel at the architectural marvels that define human ingenuity. From ancient temples to modern skyscrapers, each structure tells a story of innovation and design. Explore the world's most iconic buildings and monuments.",
            learnMore: "https://example.com/learn-more4",
            image: "https://example.com/image4.jpg"
        },
        {
            tipe: "Ocean",
            headline: "Underwater Adventures",
            desc: "Dive into the depths of the oceans and discover a world teeming with marine life and vibrant coral reefs. Witness the beauty and mystery that lies beneath the waves. Explore the wonders of the deep blue sea.",
            learnMore: "https://example.com/learn-more5",
            image: "https://example.com/image5.jpg"
        }
    ];

    return (
        <div>
            <h1>Halaman Gallery</h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {
                    cardData.map((data, index) => {
                        return (
                            <CustomCard key={index} tipe={data?.tipe} Headline={data?.headline} desc={data?.desc} learnMore />
                        )
                    })
                }
            </div>

        </div>
    );
}