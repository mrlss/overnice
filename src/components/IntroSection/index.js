import Bars from "../Bars";

export default function IntroSection() {
  return (
    <div className="bg-blue pt-20 md:pt-40 pb-10 px-4 md:pb-20 lg:px-16 intro-section">
      <div className="max-w-4xl mx-auto text-center mb-20 md:mb-40 w-full">
        <h1 className="text-gray-100 font-semibold text-5xl md:text-7xl mb-7">
          All apps in the world share the same DNA
        </h1>
        <p className="text-2xl md:text-3xl text-gray mb-0 font-normal">
          Think about infrastructure, notifications, social auth. There’s over
          70% overlap in functionality.
        </p>
      </div>

      <Bars className="mb-14" />

      <div className="grid gap-8 laptop:px-24 md:grid-cols-2 lg:gap-x-20 py-10">
        <div>
          <h2 className="mb-0 font-semibold text-4xl text-gray-100">
            Don’t reinvent the wheel every time you build a new app.
          </h2>
        </div>
        <div className="text-gray text-xl lg:text-2xl">
          <p>
            Instead, focus on what makes your app unique. We did the heavy
            lifting for you already. Just plug into our pre-made feature-suite
            and kickstart your project.
          </p>
        </div>
      </div>
    </div>
  );
}
