import fs from 'fs';
import path from 'path';

const categories = ['Electronics', 'Apparel', 'Accessories', 'Furniture', 'Photography', 'Footwear', 'Home Decor', 'Gadgets'];
const descriptors = ['Premium', 'Luxe', 'Minimalist', 'Modern', 'Classic', 'Ultra', 'Smart', 'Elite', 'Eco-friendly', 'Pro'];
const brands = ['UrbanEdge', 'NovaLux', 'Zenith', 'Apex', 'Vanguard', 'Lumina', 'Echo', 'Swift', 'Forge', 'Obsidian'];
const items = {
    'Electronics': ['Headphones', 'Speaker', 'Tablet', 'Laptop', 'Smartwatch', 'Powerbank'],
    'Apparel': ['Hoodie', 'T-Shirt', 'Jacket', 'Jeans', 'Sweater', 'Shorts'],
    'Accessories': ['Watch', 'Wallet', 'Belt', 'Sunglasses', 'Backpack', 'Scarve'],
    'Furniture': ['Chair', 'Desk', 'Lamp', 'Shelf', 'Sofa', 'Table'],
    'Photography': ['Camera', 'Lens', 'Tripod', 'Gimbal', 'Drone', 'Flash'],
    'Footwear': ['Sneakers', 'Boots', 'Sandals', 'Formal Shoes', 'Running Shoes', 'Loafers', 'Slippers', 'Heels', 'Hiking Boots', 'Canvas Shoes'],
    'Home Decor': ['Vase', 'Painting', 'Clock', 'Candle', 'Mirror', 'Rug'],
    'Gadgets': ['Drone', 'Projector', 'Console', 'VR Headset', 'E-reader']
};

const images = {
    'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    'Apparel': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    'Accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    'Furniture': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    'Photography': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    'Footwear': [
        'https://images.unsplash.com/photo-1542291026-7eec264c2744?w=500&q=80',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80',
        'https://images.unsplash.com/photo-1512374382149-4332cba75c83?w=500&q=80',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
        'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80'
    ],
    'Home Decor': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    'Gadgets': [
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
        'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80',
        'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&q=80',
        'https://images.unsplash.com/photo-1461747511725-bf58303dfaec?w=500&q=80'
    ]
};

const products = [];

for (let i = 1; i <= 500; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const itemType = items[category][Math.floor(Math.random() * items[category].length)];

    const name = `${descriptor} ${itemType} ${i}`;
    const price = Math.floor(Math.random() * (50000 - 500 + 1) + 500); // 500 to 50,000 INR
    const description = `This ${name} from our ${category} collection offers unparalleled quality and style. Perfect for ${descriptor.toLowerCase()} users who appreciate modern design.`;

    const categoryImage = images[category];
    const image = Array.isArray(categoryImage)
        ? categoryImage[Math.floor(Math.random() * categoryImage.length)]
        : categoryImage;

    products.push({
        id: i,
        name,
        brand,
        price,
        description,
        category,
        image
    });
}

const outputPath = path.resolve('src/data/products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Generated 500 products at ${outputPath}`);
