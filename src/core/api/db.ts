import { db, DB_ID } from "../lib/appwrite";


const db_example = [
    {
        name: "Cafetera X",
        price: 49.99,
        categoryId: "1",
        images: [
            "https://…/img1.jpg",
            "https://…/img2.jpg",
            "https://…/img3.jpg"
        ]
    }
]

await db.createDocument(DB_ID, 'products', 'unique()', db_example)