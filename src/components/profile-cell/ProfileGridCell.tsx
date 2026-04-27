import Image from "next/image";

export default function ProfileGridCell() {
  return (
    <div className="grid-cell h-full w-full p-6">
      <Image
        src="/profile-picture-small.jpeg"
        width={125}
        height={125}
        className="rounded-full"
        alt="Profile Picture"
      />
      <div className="mt-8 flex-col">
        <p className="inline">Hello, I am </p>
        <h1 className="inline"> Gabe Shin</h1>
        <p className="inline">
          , an AI engineer based in Seoul.{" "}
        </p>
        <br />
        <br />
        <p className="inline">
          I work on agentic systems, browser automation, and production-scale
          data pipelines — building reusable infrastructure that lets other
          teams move faster.
        </p>
      </div>
    </div>
  );
}
