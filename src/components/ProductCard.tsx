import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image?: string;
  isNew?: boolean;
}

export default function ProductCard({ 
  title, 
  price, 
  originalPrice, 
  discount, 
  image = "/placeholder-product.jpg",
  isNew = false 
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
            MỚI
          </div>
        )}
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
            -{discount}
          </div>
        )}
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
          <div className="text-green-600 text-4xl">🏕️</div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{title}</h3>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-green-600">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>

        {/* Order Button */}
        <a href="/checkout" className="block text-center w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
          Đặt hàng
        </a>
      </div>
    </div>
  );
}
