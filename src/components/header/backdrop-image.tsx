export default function BackdropImage() {
  return (
    <div
      className="w-full h-[128px] bg-center bg-no-repeat bg-cover display-block min-w-256"
      style={{
        backgroundImage: `url("/example-image.jpeg")`,
      }}
    />
  );
}
