import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Star,
  Truck,
  Shield,
  Info,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Sample item data (in real app, this would come from API based on id)
  const item = {
    _id: id,
    name: "Mahatma Gandhi 150th Birth Anniversary",
    description: "Commemorative stamp celebrating 150 years of Mahatma Gandhi's birth. Features a portrait of Gandhi with the spinning wheel (charkha) in the background.",
    category: "stamps",
    subcategory: "commemorative",
    theme: "personalities",
    postalCircle: "Delhi",
    releaseDate: new Date("2019-10-02"),
    price: 5,
    denomination: "₹5",
    images: [
      { url: "/images/gandhi-150-1.jpg", alt: "Gandhi Stamp Front", isPrimary: true },
      { url: "/images/gandhi-150-2.jpg", alt: "Gandhi Stamp Detail", isPrimary: false }
    ],
    specifications: {
      size: "40mm x 30mm",
      perforation: "13 x 13.5",
      printingProcess: "Offset",
      designer: "India Security Press",
      printer: "India Security Press, Nashik",
      paperType: "Unwatermarked",
      colors: ["Brown", "White", "Orange"]
    },
    stock: {
      quantity: 1000,
      reserved: 50,
      available: 950
    },
    isActive: true,
    isFeatured: true,
    isInStock: true,
    tags: ["Gandhi", "Independence", "Freedom Fighter", "Commemorative"],
    rating: 4.8,
    reviewCount: 124
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= item.stock.available) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-primary-600">Catalog</Link>
          <span>/</span>
          <span className="text-secondary-900">{item.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-40 bg-white rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-6xl">📮</span>
                  </div>
                  <p className="text-lg font-medium text-secondary-700">{item.denomination}</p>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-600' : 'border-secondary-200'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                    <span className="text-2xl">📮</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="badge-primary">{item.postalCircle}</span>
                <span className="badge-secondary">{item.theme}</span>
                {item.isFeatured && <span className="badge-success">Featured</span>}
              </div>
              
              <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                {item.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(item.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-secondary-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-secondary-600 ml-2">
                    {item.rating} ({item.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-lg text-secondary-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Price and Stock */}
            <div className="bg-white rounded-xl p-6 border border-secondary-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-primary-600">₹{item.price}</span>
                  <span className="text-sm text-secondary-500 ml-2">per piece</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary-600">Stock Available</p>
                  <p className="text-lg font-semibold text-green-600">
                    {item.stock.available} pieces
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-sm font-medium text-secondary-700">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= item.stock.available}
                    className="w-8 h-8 rounded-lg border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!item.isInStock}
                  className="btn-primary flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="btn-outline">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="btn-outline">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Login Prompt */}
              {!isAuthenticated && (
                <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-sm text-primary-700">
                    <Link to="/login" className="font-medium underline">Login</Link> or{' '}
                    <Link to="/register" className="font-medium underline">Register</Link> to purchase items
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-secondary-200">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Authentic</p>
                  <p className="text-xs text-secondary-600">Genuine postal item</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-secondary-200">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Fast Delivery</p>
                  <p className="text-xs text-secondary-600">3-5 business days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-secondary-200">
                <Info className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Expert Curated</p>
                  <p className="text-xs text-secondary-600">Quality assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-secondary-600">Size:</dt>
                      <dd className="font-medium text-secondary-900">{item.specifications.size}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-secondary-600">Perforation:</dt>
                      <dd className="font-medium text-secondary-900">{item.specifications.perforation}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-secondary-600">Printing Process:</dt>
                      <dd className="font-medium text-secondary-900">{item.specifications.printingProcess}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-secondary-600">Designer:</dt>
                      <dd className="font-medium text-secondary-900">{item.specifications.designer}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-secondary-600">Printer:</dt>
                      <dd className="font-medium text-secondary-900">{item.specifications.printer}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-secondary-600">Paper Type:</dt>
                      <dd className="font-medium text-secondary-900">{item.specifications.paperType}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;