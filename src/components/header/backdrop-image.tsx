export default function BackdropImage() {
  return (
    <div
      className="w-full h-[160px] bg-center bg-no-repeat bg-cover display-block min-w-256"
      style={{
        backgroundImage: `url("/banner-image.jpeg")`,
      }}
    />
  );
}
