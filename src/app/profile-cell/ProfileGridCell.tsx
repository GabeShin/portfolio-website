export default function ProfileGridCell() {
  return (
    <div className="grid-cell h-full w-full p-6" style={{ display: "flex" }}>
      <div>
        <p className="inline">Hello, I am </p>
        <h1 className="inline"> Gabe Shin</h1>
        <p className="inline">
          , a web developer from South Korea currently based in Berlin.{" "}
        </p>
        <p />
        <p className="inline">
          I am interested in applying AI in products and look for ways to
          implement my knowledge of web development.
        </p>
      </div>
    </div>
  );
}
