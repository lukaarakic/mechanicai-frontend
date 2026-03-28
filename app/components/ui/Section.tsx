const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4 py-7 border-b border-white/[0.06] last:border-0 last:pb-0 first:pt-0">
    <div>
      <h3 className="text-sm font-medium text-white">{title}</h3>
      {description && (
        <p className="mt-0.5 text-xs text-white/35">{description}</p>
      )}
    </div>
    {children}
  </div>
);

export default Section;
