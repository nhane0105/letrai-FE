import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  // Featured Products Data
  const featuredProducts = [
    {
      title: "Cho Thuê Thuyền SUP Cơ Bản",
      price: "200,000₫/ngày",
      image: "/sup-basic.jpg"
    },
    {
      title: "Cho Thuê Lều Cắm Trại 4 Người Eureka",
      price: "60,000₫/ngày",
      image: "/tent-4p.jpg"
    },
    {
      title: "Cho Thuê Lều Mông Cổ Glamping",
      price: "800,000₫/ngày",
      image: "/mongolia-tent.jpg"
    },
    {
      title: "Combo Lều 6 Người Cao Cấp",
      price: "200,000₫/ngày",
      image: "/combo-6p.jpg"
    }
  ];

  // Tent Products Data
  const tentProducts = [
    { title: "Cho Thuê Lều Cắm Trại 2 Người Salida", price: "40,000₫/ngày" },
    { title: "Cho Thuê Lều Cắm Trại 4 Người Eureka", price: "60,000₫/ngày" },
    { title: "Cho Thuê Lều Cắm Trại 6 Người Eureka", price: "70,000₫/ngày" },
    { title: "Cho Thuê Lều Cắm Trại 10 Người Outwell", price: "150,000₫/ngày" },
    { title: "Cho Thuê Lều 2 Người Vintage Mẫu 2024", price: "100,000₫/ngày" },
    { title: "Cho Thuê Lều 4 Người Vintage Mẫu 2024", price: "150,000₫/ngày" },
    { title: "Cho Thuê Lều Mông Cổ Trắng Mẫu 2024", price: "250,000₫/ngày" },
    { title: "Cho Thuê Lều Mông Cổ Glamping", price: "800,000₫/ngày" },
    { title: "Cho Thuê Lều 6 Người Vintage Mẫu 2024", price: "200,000₫/ngày" },
    { title: "Cho Thuê Lều 8 Người Cao Cấp Mẫu 2024", price: "180,000₫/ngày" },
    { title: "Cho Thuê Tăng Che Mưa Cao Cấp", price: "120,000₫/ngày" },
    { title: "Cho Thuê Tăng Glamping Dã Ngoại 6 Cánh", price: "200,000₫/ngày" }
  ];

  // Sale Products Data
  const saleProducts = [
    { title: "Lều 2 người Kelty Salida mới 100%", price: "850,000₫", originalPrice: "1,100,000₫", discount: "23%" },
    { title: "Lều Vintage 2 Người mẫu 2024", price: "1,200,000₫", originalPrice: "1,500,000₫", discount: "20%" },
    { title: "Lều 4 người Dragon Dome mẫu 2024", price: "1,100,000₫", originalPrice: "1,500,000₫", discount: "27%" },
    { title: "Lều 4 người Kelty Salida VNXK mới 100%", price: "1,100,000₫", originalPrice: "1,500,000₫", discount: "27%" },
    { title: "Lều Vintage 4 người mẫu 2024", price: "2,000,000₫", originalPrice: "2,400,000₫", discount: "17%" },
    { title: "Lều 6 người Eureka Tetragon mới 100%", price: "1,200,000₫", originalPrice: "1,500,000₫", discount: "20%" },
    { title: "Lều 8 Người Dragon Dome mẫu 2024", price: "2,600,000₫", originalPrice: "3,000,000₫", discount: "13%" },
    { title: "Lều Mông Cổ 8 người mẫu 2024", price: "3,600,000₫", originalPrice: "4,000,000₫", discount: "10%" },
    { title: "Lều 10 người mẫu 2023", price: "2,500,000₫", originalPrice: "3,000,000₫", discount: "17%" },
    { title: "Lều Mông Cổ Glamping MountainHike", price: "8,000,000₫", originalPrice: "8,700,000₫", discount: "8%" },
    { title: "Tăng Glamping dã ngoại 6 cánh", price: "2,800,000₫", originalPrice: "3,000,000₫", discount: "7%" },
    { title: "Lều Cá Nhân – Thực Hiện 3 Tại Chỗ", price: "239,000₫", originalPrice: "340,000₫", discount: "30%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              ĐƠN VỊ CUNG ỨNG LỀU LỚN NHẤT MIỀN NAM
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              PHỤ KIỆN DÃ NGOẠI - CAMPING TẤT TẦN TẬT CHO MỘT BUỔI CẮM TRẠI
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">THỂ THAO DƯỚI NƯỚC</h3>
                <p className="text-sm">CHO THUÊ VÁN CHÈO SUP - THUYỀN HƠI</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">PHỤ KIỆN DÃ NGOẠI</h3>
                <p className="text-sm">CAMPING TẤT TẦN TẬT CHO MỘT BUỔI CẮM TRẠI</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">LỀU CÁ NHÂN</h3>
                <p className="text-sm">THỰC HIỆN 3 TẠI CHỖ</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">ĐƠN VỊ CUNG ỨNG LỀU</h3>
                <p className="text-sm">LỚN NHẤT MIỀN NAM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Sản phẩm cho thuê nổi bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  isNew={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tent Rental Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              CHO THUÊ LỀU CẮM TRẠI
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Tất cả sản phẩm', 'Lều 2 Người', 'Lều 4 Người', 'Lều 6 Người', 'Lều 8 Người', 'Lều 12 Người', 'Lều Mông Cổ'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filter === 'Tất cả sản phẩm'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tentProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  price={product.price}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Xem thêm
              </button>
            </div>
          </div>
        </section>

        {/* Sale Products Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              BÁN LỀU CẮM TRẠI - THANH LÝ LỀU ĐÃ QUA SỬ DỤNG
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Tất cả sản phẩm', 'Lều Cắm Trại Mới 100%', 'Lều Đã Qua Sử Dụng'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filter === 'Tất cả sản phẩm'
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {saleProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Xem thêm
              </button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Thông tin cắm trại
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Những cung đường ven biển đẹp nhất Việt Nam hiện nay",
                  date: "15 Tháng Ba, 2024"
                },
                {
                  title: "Cung đường chữ M Hà Giang với cảnh sắc say lòng người",
                  date: "15 Tháng Ba, 2024"
                },
                {
                  title: "Những cung đường nguy hiểm nhất thế giới khiến nhiều người kinh hoàng",
                  date: "15 Tháng Ba, 2024"
                },
                {
                  title: "Phượt Cần Giờ – Những điểm du lịch hấp dẫn với phượt thủ",
                  date: "15 Tháng Ba, 2024"
                }
              ].map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <div className="text-green-600 text-4xl">🏞️</div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h3 className="font-medium text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                      Đọc thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
