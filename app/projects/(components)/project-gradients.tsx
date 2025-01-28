export function CheckoutGradients() {
  const desktopClasses = "absolute inset-0 checkout-background-base";
  const mobileClasses = "checkout-background-base checkout-mobile-grainy-blur";

  return (
    <>
      <div className="hidden md:block">
        {[
          "top-left-gradient-background",
          "bottom-right-gradient-background",
          "grain-background",
          "grid-bg",
        ].map((bgClass, index) => (
          <div key={index} className={`${bgClass} ${desktopClasses}`} />
        ))}
      </div>
      <div className="block md:hidden">
        {[
          "checkout-mobile-top-gradient",
          "checkout-mobile-bottom-gradient",
        ].map((bgClass, index) => (
          <div key={index} className={`${bgClass} ${mobileClasses}`} />
        ))}
        <div className="grain-background checkout-background-base h-full min-h-screen" />
      </div>
    </>
  );
}
