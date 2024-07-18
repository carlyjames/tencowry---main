import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faArrowLeft, faArrowRight, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import placeholderImage from '../Assets/images/home-placeholder.jpeg';
import ad1 from '../Assets/images/TopDeals/id3-banner2.jpg';
import ad2 from '../Assets/images/TopDeals/id3-banner3.jpg';

const TopDeals = () => {
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "d2db2862682ea1b7618cca9b3180e04e"
  ;

  useEffect(() => {
    const fetchDeals = async () => {
      const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/topdeals?skip=0&limit=20';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDeals(data.data || []);
        console.log(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(deals)) {
    return <div>Error: Invalid data format</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-12 mb-24 w-full pb-8">
      <div className="flex items-center gap-2 lg:text-2xl text-xl border-b-2 border-gray-300">
        <FontAwesomeIcon icon={faBolt} color="#ff5c40" />
        <h1 className="border-b-2 border-[#ff5c40]">Top Deals</h1>
      </div>

      <Slider {...settings} className="mySwiper relative mt-2 w-full p-4 px-4">
        {deals.map((item) => (
          <div className="swiperItem relative max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" key={item.id}>
            <Link key={item.product_id} to={`/product/detail/${item.idl_product_code}/${item.supplier_id}`}>
              <img
                className="h-[200px] w-full object-cover rounded-t-lg"
                src={item.main_picture ? item.main_picture : placeholderImage}
                alt={item.product_name}
              />
              <FontAwesomeIcon icon={faHeart} title="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
              <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                <div className="flex items-center justify-between font-bold text-sm">
                  <p className="text-gray-500 line-through">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}
                  </p>
                  <p className="text-green-400">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}
                  </p>
                  <p className="text-red-400">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}
                  </p>
                </div>
                <Link to={`/item/${item.productCode}`}>
                  <div className="w-full flex cursor-pointer items-center justify-end">
                    <div className="w-max self-end p-2 rounded-lg bg-white border border-gray-300 hover:bg-[#ff5c40] transition ease-in delay-150">
                      <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    </div>
                  </div>
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </Slider>

      {/* AD */}
      <div className="mt-12 w-full flex lg:flex-row flex-col items-center justify-center lg:gap-8 gap-4">
        <img src={ad1} className="cursor-pointer " alt="top collection" />
        <img src={ad2} className="cursor-pointer " alt="top-collection" />
      </div>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#0f3460", borderRadius: "50%", padding: "10px" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} color="white" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#0f3460", borderRadius: "50%", padding: "10px" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} color="white" />
    </div>
  );
};

export default TopDeals;
