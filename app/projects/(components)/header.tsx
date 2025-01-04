export default function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl -mt-2">{title}</h1>
      {/* Tags */}
      {/* Description */}
      <p className="-mt-4 text-base text-muted-foreground text-[16.5px]">
        {description}
      </p>
    </div>
  );
}
