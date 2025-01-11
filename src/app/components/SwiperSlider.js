<Swiper
  spaceBetween={30}
  slidesPerView={1}
  autoplay={{
    delay: 3000, // Automatically slides every 3 seconds
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  navigation
  loop
>
  {[
    "/images/zack.jpg",
    "/images/zack1.jpg",
    "/images/zack2.jpg",
    "/images/zack4.jpg",
  ].map((image, index) => (
    <SwiperSlide key={index}>
      <div
        className="h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-green-700 bg-opacity-70 p-8 rounded-lg shadow-xl text-white text-center">
          <h1 className="text-5xl font-bold">Slide {index + 1}</h1>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
