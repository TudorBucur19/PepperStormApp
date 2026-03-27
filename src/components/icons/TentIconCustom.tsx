const TentIcon = ({
  fill = "#2e7d32",
  ariaLabel = "Camping friendly",
}: {
  fill?: string;
  ariaLabel?: string;
}) => {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-label={ariaLabel}>
      <title>{ariaLabel}</title>
      <path
        fill={fill}
        d="M12 3L3.5 19A1.5 1.5 0 0 0 4.8 21H9.2A1.5 1.5 0 0 0 10.6 20.2L12 17.5L13.4 20.2A1.5 1.5 0 0 0 14.8 21H19.2A1.5 1.5 0 0 0 20.5 19L12 3Z
         M9.5 4L12 7.2L14.5 4A0.8 0.8 0 0 0 13.2 3L12 4.5L10.8 3A0.8 0.8 0 0 0 9.5 4Z"
      />
    </svg>
  );
};

export default TentIcon;
